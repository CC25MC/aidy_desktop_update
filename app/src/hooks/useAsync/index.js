import { useCallback, useLayoutEffect, useReducer, useRef } from "react";

const useSafeDispatch = dispatch => {
    const mountedRef = useRef(false);
    useLayoutEffect( () => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);
    return useCallback( (...args) => mountedRef.current ? dispatch(...args) : void 0 , [dispatch]);
};

const defaultInitialState = { status: 'idle' , data: null, error: null };
const useAsync = (initialState) => {
    const initialStateRef = useRef({
        ...defaultInitialState,
        ...initialState
    });
    const [ { status , error , data } , setState ] = useReducer(
        (state, action) => ({ ...state , ...action}),
        initialStateRef.current
    );

    const safeSetState = useSafeDispatch(setState);

    const setData = useCallback(
        data => safeSetState({data , status: 'resolved'}),
        [safeSetState]
    );

    const setError = useCallback(
        error => safeSetState({error, status: 'rejected'}),
        [safeSetState]
    );

    const reset = useCallback(
        () => safeSetState(initialStateRef.current),
        [safeSetState]
    );

    const run = useCallback(
        promise => {
            if(!promise || !promise.then){
                throw new Error(
                    `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
                );
            }
            safeSetState({status: 'pending'});
            return promise.then(
                data => {
                    setData(data);
                    return data;
                },
                error => {
                    setError(error);
                    return Promise.reject(error);
                }
            );
        },
        [safeSetState,setError,setData]
    );

    return {
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset
    };
};

export { useAsync };