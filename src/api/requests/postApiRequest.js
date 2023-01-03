import axios from "axios";
import {ADMIN_AUTH_TOKEN} from "../apiConst";

export const postApiRequest = async (url, data) => {
    return await axios.post(url, data, {
        headers: {
            "Authorization": ADMIN_AUTH_TOKEN,
        }
    })
        .then(response => response)
        .catch(error => console.log(error));
}
