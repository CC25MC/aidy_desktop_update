import { useContext, useCallback } from "react";
import { AuthContext } from "context/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import { mergeArrayObjects, parseExcelData } from 'utils';
import { client } from "../../api";

const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error(`useAuth must be used within a AuthProvider`);
    }
    return context;
};


const useClient = () => {
    const { user } = useAuth();
    const token = user?.token;
    return useCallback(
        ( endpoint ,config ) => client(endpoint, {...config,token}),
        [token]
    );
};

const useValidateKey = () => {
    const client = useClient();
    const { updateUser, user } = useAuth();
    return useMutation(
        async ({ code, device }) => {
            const result = await client("/licenses", {
                method: 'GET',
                params: {
                    code
                }
            });
            let validation = { isValid: false };
            if(result?.length){
                let license = result[0];

                //Validate devices
                if(!license.devices.length){
                    await client("/devices", {
                        method: 'POST',
                        data: {
                            "license_id": license.id,
                            "license_code": code,
                            "device_code": device
                        }
                    });
                    let updatedResult = await client("/licenses", {
                        method: 'GET',
                        params: {
                            code
                        }
                    });
                    license = updatedResult[0];
                }
                validation.isValid = license.active;
                if(validation.isValid){
                    updateUser({
                        id: user.id,
                        key: license.code
                    });
                }
            }
            return validation;
        }
    );
};

const useSaveDocument = () => {
    const client = useClient();
    const { user } = useAuth();
    return useMutation(
        async ({ file, type }) => {
            const form = new FormData();
            const licenseResult = await client("/licenses", {
                method: 'GET',
                params: {
                    code: user.key
                }
            });
            const license = licenseResult[0];
            form.append("files.file",file);
            form.append("data", JSON.stringify({
                type,
                data: null,
                license: {
                    ...license
                }
            }));
            const result = await client("/documents", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: form
            });
            return result;
        }
    )
}

const useImportClientsMutation = () => {
    const clientKeyMap = {
        nombre: "name",
        apellido: "lastname",
        telefono: "phone",
        whatsapp: "whatsapp",
        direccion: "address"
    }
    const bookshelf = window.bookshelf;
    const queryClient = useQueryClient();
    return useMutation( async ({ clients }) => {
        const parsedClients = parseExcelData( clients, clientKeyMap );
        const newClients = await bookshelf.clients.upsertMany({
            data: parsedClients
        });
        return newClients;
    }, {
        onSuccess: (data) => {
            queryClient.setQueryData(
                "clients",
                old => {
                    return mergeArrayObjects(old,data);
                }
            );
        }
    });
}

export { useClient, useValidateKey, useAuth, useSaveDocument, useImportClientsMutation };