import axios from "axios"
import { message } from "antd"
import { Config } from "./config"

// const baseUrl = "http://localhost:8083/api/v1/";
export const request = (method="",url="",data={}) => {

    var access_token = localStorage.getItem("access_token");
    console.log(access_token)
    var header = {'Content-Type': 'application/json'}
    if(data instanceof FormData){
        header = {  'Content-Type': 'multipart/form-data'}
    }

    if(access_token != null && access_token != ""){
        header = {
            ...header,
            "Authorization" : `Bearer ${access_token}`
        }
      
    }
    return axios({
        url : Config.baseUrl + url,
        method : method,
        data : data,
        headers : header
    }).then(res=>{
        return res
    }).catch(err=>{
        if(err.code == "ERR_NETWORK"){
            message.error("Can not connect to server. Plase contact administration!")
            return false
        }
        return false
    })
}