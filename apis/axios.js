import axios from "axios";
const axiosIntance = axios.create({
    baseURL: "http://192.168.1.5:3000",
});

export const updateToken = jwt => {
    axiosIntance.interceptors.request.use(config => {
        config.headers.authorization = 'Bearer ' + jwt;
        return config
    });
}
export default axiosIntance;