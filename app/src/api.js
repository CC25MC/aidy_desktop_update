import axios from "axios";
import * as auth from "./AuthProvider";

const BASE_API_URL = window.baseUrl;

const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 30000
});

const client = (
    endpoint, 
    { data , token, headers : customHeaders, ...customConfig } 
) => {
    return api({
        ...customConfig,
        url: endpoint,
        data,
        headers: {
           ...( token ? { 'Authorization': `Bearer ${token}` } : { } ),
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders
        }
    })
    .then( async response => {
        if(response.status === 401) {
            await auth.logout();
            return Promise.reject({ message: 'Please reauthenticate'});
        }
        const data = response.data;
        //TODO: validate response ok
        return data;
    });
};

export { client };