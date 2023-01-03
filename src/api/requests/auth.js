import axios from "axios";
import {URL_AUTH} from "../apiConst";

const auth = (data) => {
     return axios.post(URL_AUTH,data)
        .then(res=>res)
}

export default auth;
