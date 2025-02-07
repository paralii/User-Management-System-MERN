import axios from "axios";
import { baseURL } from "../Constants/constants";
import {store} from "../redux/store";

const axiosInstance = axios.create({
    baseURL: baseURL,
})

axiosInstance.interceptors.request.use((config)=>{

    const token = store.getState().auth.token;

    if(token){
        config.headers.Authorization = `Bearer ${token}` ;
    }

    return config ;
},(error) => {
    return Promise.reject(error)
}

)

export default axiosInstance