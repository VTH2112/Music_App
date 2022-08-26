import axios from "axios";
import serverUrl1 from "./Serverurl";
const axiosIntance = axios.create({
    baseURL: "http://192.168.1.5:3000",
    // baseURL: serverUrl1,
});

export const updateToken = jwt => {
    axiosIntance.interceptors.request.use(config => {
        config.headers.authorization = 'Bearer ' + jwt;
        return config
    });
}
export default axiosIntance;