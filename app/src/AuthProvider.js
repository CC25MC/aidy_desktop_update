import axios from 'axios';

export const tokenKey = "__AIDY_TOKEN__";
export const userKey = "__AIDY_USER__";
export const isGuestKey = "__AIDY_IS_GUEST__";

const BASE_API_URL = window.baseUrl;

const getToken = async () => {
    return localStorage.getItem(tokenKey);
};

/*const handleLoginResponse = async ({ user } : any) => {
    await AsyncStorage.setItem(tokenKey, user.token);
    return user;
}*/

const login = async ( data ) => {
    try{
        const loginResponse = await client('auth/local',data);
        const user = await window.bookshelf.users.findMany({
            where: {
                email: data.identifier
            }
        });
        const currentUser = user[0];
        if(currentUser){
            localStorage.setItem(
                userKey,
                JSON.stringify(currentUser)
            );
            return {...currentUser, token: loginResponse.jwt};
        }
        return null;
    }catch( err ){
        console.log(err);
    }
};

const loginAsGuest = () => {
    localStorage.setItem(isGuestKey,true);
}

const register = async ( data ) => {
    const registerResponse = await client('/auth/local/register',{
        username: data.email,
        email: data.email,
        password: data.password
    });
    const newUser = await window.bookshelf.users.create({
        data
    });
    localStorage.setItem(userKey,JSON.stringify(newUser));
    //localStorage.setItem(tokenKey,registerResponse.jwt);
    return {...newUser,token: registerResponse.jwt };
};

const updateUser = async ({id,token,...data}) => {
    const user = await window.bookshelf.users.update({
        where: {
            id
        },
        data: {
            ...data
        }
    });
    localStorage.setItem(userKey,JSON.stringify(user));
    return user;
};

const logout = async () => {
   localStorage.removeItem(tokenKey);
   localStorage.removeItem(userKey);
   localStorage.removeItem(isGuestKey);
};

const client = async (endpoint, data) => {
    return axios.post( endpoint, data, {
        baseURL: BASE_API_URL
    } ).then( response => {
        const { data } = response;
        return data;
    });
};

export { login , logout , register, getToken, updateUser, loginAsGuest };