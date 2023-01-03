import axios from "axios";
import {URL_REGISTER} from "../apiConst";

const register = (data) => {
    console.log(data);
     return axios.post(URL_REGISTER,data).catch(error=>{
         console.log(error.response.status)
     });

}

export default register;
