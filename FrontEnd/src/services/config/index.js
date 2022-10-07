import axios from "axios";
const api = axios.create({
    baseURL: process.env.VUE_APP_ENVIRONMENT === "P" ? process.env.VUE_APP_URL_API_PRODUCTION : process.env.VUE_APP_URL_API_DEVELOPMENT,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

export { api };
