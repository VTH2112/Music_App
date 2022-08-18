import axios from "axios";
import server from "./Serverurl";
const axiosIntance = axios.create({
    //baseURL: "http://192.168.0.120:3000",
    baseURL: server,
});

export const updateToken = jwt => {
    axiosIntance.interceptors.request.use(config => {
        config.headers.authorization = 'Bearer ' + jwt;
        return config
    });
}
export default axiosIntance;