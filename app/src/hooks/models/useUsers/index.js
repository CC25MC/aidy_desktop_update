import { useMutation, useQuery } from 'react-query';
import { atom, useAtom } from "jotai";
import { useToasts } from "bumbag";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { persistState, getPersistedState } from "utils";
import { PERSISTOR_KEYS } from "variables";

const userAtom = atom(getPersistedState(PERSISTOR_KEYS.user) ?? [{}]);
const authAtom = atom(getPersistedState(PERSISTOR_KEYS.auth) ?? { isAuthenticated: false, token: "" });
const useAuth = () => {
    const toasts = useToasts();
    const [user, setUser] = useAtom(userAtom);
    const [auth, setAuth] = useAtom(authAtom);

    useEffect(() => persistState(PERSISTOR_KEYS.auth, auth), [auth]);
    useEffect(() => persistState(PERSISTOR_KEYS.user, user), [user]);

    const logOut = () => {
        //eslint-disable-next-line
        setUser([{}]);
        //eslint-disable-next-line
        setAuth({ isAuthenticated: false });
        toasts.success({
            title: 'Cerraste Sesión ',
            message: `Hasta luego ${user[0]?.name}`
        });
    };
    return {
        user, setUser, auth, setAuth, logOut
    };
};

const useUsers = () => {
    const bookshelf = window.bookshelf;
    return useQuery(
        "users",
        () => bookshelf.users.findMany(),
        { initialData: [] }
    );
};

const login = () => {
    const bookshelf = window.bookshelf;
    const toasts = useToasts();
    const { setAuth, setUser } = useAuth();
    const router = useHistory();

    return useMutation(
        async (form) => {
            //eslint-disable-next-line
            try {
                const clientQuery = { email: form.email };
                const result = await bookshelf.users.findMany({ where: clientQuery });
                if (!result[0]?.email) throw new Error(' Email no encontrado');
                if (result[0]?.password !== form.password) throw new Error(' Contraseña no concuerda');

                return result;
            } catch (e) {
                toasts.danger({
                    title: 'Ocurrio un Error',
                    message: e.toString(),
                });
                return e;
            }

        }, {
        onSuccess: data => {
            if (data[0]?.name) {
                setUser(data);
                setAuth({ isAuthenticated: true });
                toasts.success({
                    title: 'Usuario logueado',
                    message: `Bienvenido a Aidy Lite ${data[0]?.name}`
                });
                router.push("/pos");
            }
        },
    });
};

const useMutateUser = () => {
    const bookshelf = window.bookshelf;
    const toasts = useToasts();
    const { setAuth, setUser, user } = useAuth();
    const router = useHistory();

    return useMutation(
        async (form) => {
            //eslint-disable-next-line
            const clientQuery = {
                ...(user[0].id ? {
                    where: {
                        id: user[0].id,
                    }
                } : {}),
                data: {
                    ...form
                }
            };
            const method = user[0].id ? "update" : "create";
            const result = await bookshelf.users[method](clientQuery);
            return result;
        }, {
        onSuccess: data => {
            if (!Array.isArray(data)) {
                setUser([data]);
                setAuth({ isAuthenticated: true });
                toasts.success({
                    title: data?.key || data?.rut ? 'Usuario Actualizado' : 'Usuario Registrado',
                    message: data?.key || data?.rut ? 'Se ha actualizado el usuario': `Bienvenido a Aidy Lite ${data?.name}`
                });
                router.push("/pos");
            }
        }
    }
    );
};

export { useUsers, useMutateUser, login, useAuth, userAtom };