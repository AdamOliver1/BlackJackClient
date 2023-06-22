import axios from 'axios';

//TODO add token for admin authorization
const axiosApi = axios.create({
    baseURL: "http://localhost:8000/api/v1/"
});

export default axiosApi;  