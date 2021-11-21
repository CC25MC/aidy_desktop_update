import { useState, useEffect } from 'react';
import { persistState, getPersistedState } from "utils";
import { atom, useAtom } from "jotai";
import { PERSISTOR_KEYS } from "variables";
import { useAuth } from 'hooks/useClient';
import { Total } from 'utils';
import { useAsync, useNuxo } from 'hooks';
import { useBillsId } from 'hooks/models';

const listAtom = atom(getPersistedState(PERSISTOR_KEYS.list) ?? []);

export const useConnected = () => {
    const [connected, setConnected] = useState(navigator.onLine);
    const [listCheckoutOffline, setListCheckoutOffline] = useAtom(listAtom);
    const { user } = useAuth();
    const { createBoleta } = useNuxo();
    const { run } = useAsync();
    const { billIds, deletebillIds } = useBillsId();

    useEffect(() => persistState(PERSISTOR_KEYS.list, listCheckoutOffline), [listCheckoutOffline]);

    const handleConnectionChange = () => {
        console.log({ navigator });
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            setConnected(true);
            /*const webPing = setInterval(
              () => {
                  setConnected(true);
                  return clearInterval(webPing);
                  fetch('//google.com', {
                      mode: 'no-cors',
                  })
                  .then(() => {
                      setConnected(true);
                      return clearInterval(webping)
                  })
                  .catch( () => setConnected(false) )
              }, 2000);
              return;*/
        } else {
            setConnected(false);
        }
    }

    useEffect(() => {
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
        return () => {
            window.removeEventListener('offline', handleConnectionChange);
            window.removeEventListener('online', handleConnectionChange)
        }
    }, [setConnected]);

    useEffect(() => {
        setInterval(function () {
            if (connected && listCheckoutOffline.length > 0) {
                let currentUser = user;
                // console.log(listCheckoutOffline[0]);
                const params = {
                    user: currentUser.rut,
                    password: currentUser.passwordEboleta,
                    amount: Total(listCheckoutOffline[0]),
                    rut: currentUser.rut,
                    certificatePassword: currentUser.certificate || "",
                    empOption: "",
                    billsId: billIds[0],
                };
                run(createBoleta(params));
                console.log(params);
                listCheckoutOffline.splice(0, 1);
                deletebillIds();
            }
        }, 300000);
    }, [connected]);
    const addList = (item) => {
        const newData = [
            ...listCheckoutOffline,
            item
        ];
        setListCheckoutOffline(newData);
    };
    const emptyList = () => {
        setListCheckoutOffline([]);
    };

    return {
        connected,
        listCheckoutOffline,
        addList,
        emptyList
    };
};