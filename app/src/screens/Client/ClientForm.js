import { FormLayout } from "components";
import { Drawer, Stack, Box, Button, useToasts } from 'bumbag';
import { Formik, ErrorMessage } from "formik";
import { TextField, RutField, PhoneField} from "components/formik";
import { useHistory } from "react-router";
import { useAtom } from 'jotai';
import { useMutateClient, clientAtom } from "hooks/models/useClients";
import { formInitialValues, formValidation } from './data';
import { PhoneInput } from "components/molecules";
import { useState } from "react";

const ClientForm = () => {
    const history = useHistory();
    const toasts = useToasts();
    const [client, setClient] = useAtom(clientAtom);
    const { mutateAsync: saveClient } = useMutateClient();
    const [ phoneFieldFocused, setPhoneFieldFocused ] = useState(false);
    return (
        <Formik
            initialValues={formInitialValues(client)}
            validationSchema={formValidation}
            onSubmit={(values) => {
                saveClient(values).then(
                    () => {
                        setClient(null);
                        if (values.id) {
                            toasts.success({
                                title: 'Cliente Actualizado',
                                message: `Se ha actualizado correctamente el cliente ${values.name}`
                            });
                        } else {
                            toasts.success({
                                title: 'Cliente Creado',
                                message: `Se ha creado correctamente el cliente ${values.name}`
                            });
                        }
                        history.push("/client");
                    }
                );

            }}
        >
            {({ handleSubmit, values, setFieldValue }) => (
                <Drawer isFullScreen={true} visible={true} style={{
                    zIndex: 1960
                }}>
                    <FormLayout title="Nuevo Cliente" alignX="center" goback="client" onGoBack={() => { setClient(null); }}>
                        <Stack spacing="major-2">
                            <Stack orientation="horizontal" spacing="major-2">
                                <Box>
                                    <TextField name="name" label="Nombre" />
                                    <ErrorMessage
                                        name='name'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                                <Box>
                                    <TextField name="lastname" label="Apellido" />
                                    <ErrorMessage
                                        name='lastname'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                            </Stack>
                            <Stack orientation="horizontal" spacing="major-2">
                                <Box>
                                    <RutField name="rut" label="Rut" />
                                    <ErrorMessage
                                        name='rut'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                                <Box>
                                    <PhoneField name="phone" label="Teléfono" onBlur = {() => {
                                        if(values.phone.length > 2){
                                            setPhoneFieldFocused(true);
                                            setFieldValue('whatsapp',values.phone);
                                        }
                                    }} />
                                    <ErrorMessage
                                        name='phone'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>

                            </Stack>
                            <Stack orientation="horizontal" spacing="major-2">
                                <Box>
                                    <TextField name="address" label="Dirección" />
                                    <ErrorMessage
                                        name='address'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                                <Box>
                                    <PhoneInput 
                                        name="whatsapp" 
                                        label="Whatsapp" 
                                        value = { !phoneFieldFocused ? values.phone : values.whatsapp }
                                        defaultValue = "+56"
                                        onChange = {(phone) => {
                                            setFieldValue('whatsapp',phone);
                                        }}
                                    />
                                    <ErrorMessage
                                        name='whatsapp'
                                        component='div'
                                        className='field-error text-danger'
                                    />
                                </Box>
                            </Stack>
                            <Button width="100%" palette="white" onClick={handleSubmit}>
                                Guardar
                            </Button>
                        </Stack>
                    </FormLayout>
                </Drawer>
            )}
        </Formik>
    );
};

export { ClientForm };