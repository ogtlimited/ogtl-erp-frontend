import axios from 'axios'
import tokenService from './token.service'

let headers = {}
const token = tokenService.getToken()
if(token){
    headers.Authorization = `Bearer ${token}`
}
const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    headers
})
axiosInstance.interceptors.response.use(
    (response) =>
    new Promise((resolve,reject) =>{
        console.log(response)
        resolve(response)
    }),
    (error)=>{
        if(!error.response){
            return new Promise((resolve,reject) =>{
                reject(error)
            })
        }
        if(error.response.status === 401){
            tokenService.removeToken()
            window.location = "/auth"
        }else{
            return new Promise((resolve,reject) =>{
                reject(error)
            })
        }
    }
   
)

export default axiosInstance
