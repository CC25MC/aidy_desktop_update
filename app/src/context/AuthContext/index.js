import React , { createContext, useCallback, useEffect, useMemo } from "react";
import { useAsync } from "hooks/useAsync";
import * as auth from "../../AuthProvider";

const bootstrapAppData = async () => {
    try{
        const storedUser = localStorage.getItem(
            auth.userKey
        );
        const isGuest = localStorage.getItem(
            auth.isGuestKey
        );
        if( storedUser ) {
            const user = JSON.parse(storedUser);
            return user;
        }
        if(isGuest){
            return { isGuest }
        }
        return null;
    }catch(err){
        return null;
    }
};

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = ( props ) => {
    const {
        data : user,
        status,
        isLoading,
        isIdle,
        isSuccess,
        isError,
        run,
        setData
    } = useAsync();

    useEffect( () => {
        run( bootstrapAppData() );
    } , [run]);

    const login = useCallback(
        async form => {
            const user = await auth.login(form);
            if(!user){
                throw new Error("Usuario o clave invalida");
            }

            setData(user);
            return user;
        },
        [setData]
    );

    const register = useCallback(
        form => {
            return auth.register( form ).then( user => setData(user) );
        },
        [setData]
    );

    const logout = useCallback(
        () => {
            auth.logout();
            setData(null);
        } , [ setData ]
    );

    const updateUser = useCallback(
        (form) => {
            auth.updateUser(form).then( user => setData(user) );
        }, [setData]
    );

    const loginAsGuest = useCallback(
        async () => {
            auth.loginAsGuest();
            setData({ isGuest: true });
        }, [setData]
    )

    const value = useMemo(
        () => ({ setUser: setData, login, logout, register, user, updateUser, isGuest: user?.isGuest, loginAsGuest }),
        [login,logout,register,user, updateUser, loginAsGuest, setData]
    );

    if( isLoading || isIdle ){
        //TODO: add splash screen
        return null;
    }

    if( isError ) {
        //TODO: add full page error screen
        return null;
    }

    if( isSuccess ) {
        return <AuthContext.Provider value = {value} {...props} />;
    }

    throw new Error(`Unhandled status: ${status}`);

};

export { AuthProvider, AuthContext };