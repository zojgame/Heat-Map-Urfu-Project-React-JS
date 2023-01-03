import axios from "axios";
import {ADMIN_AUTH_TOKEN} from "../apiConst";

export const getApiRequest = async (url) => {
    return await axios.get(url, {
        headers: {
            Authorization: ADMIN_AUTH_TOKEN,
        }
    })
        .then(response => response.data)
        .catch(error => console.log(error))
}
