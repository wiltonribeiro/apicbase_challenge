import axios from 'axios';

const baseDomain = process.env.VUE_APP_API_URL;
const baseURL = `${baseDomain}`;

const instance = axios.create({
    baseURL
});

//Here I could use any type of interceptors to check the authentication,
//or asking for new token, just using the interceptors of axios.

export default instance;
