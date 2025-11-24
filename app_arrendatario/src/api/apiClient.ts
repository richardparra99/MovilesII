import axios from "axios";

const api = axios.create({
    baseURL: "https://airbnbmob2.site",
    timeout: 10000,
})

export default api;