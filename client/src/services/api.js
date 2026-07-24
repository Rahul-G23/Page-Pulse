import axios from "axios";

const api = axios.create({
    baseURL: "https://page-pulse-backend-aej1.onrender.com/api"
});

export default api;