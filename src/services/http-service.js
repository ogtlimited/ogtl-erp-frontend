import axiosInstance from "./api"

class HttpService {

    getReq(url){
        return axiosInstance.post(url)
    }
    postReq(url, data){
        return axiosInstance.post(url, data)
    }
    putReq(url, data){
        return axiosInstance.post(url,data)
    }
    deleteReq(url){
        return axiosInstance.post(url)
    }

}
export default new HttpService();