import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081/api"
});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        // Do not send JWT for register or login
        const isPublicRequest =
            config.url === "/users/register" ||
            config.url === "/users/login";

        if (token && !isPublicRequest) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;