import axios from 'axios';
const authInstance = axios.create({
    baseURL: ''
});

export default authInstance;