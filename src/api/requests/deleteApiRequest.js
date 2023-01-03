import axios from "axios";
import {ADMIN_AUTH_TOKEN} from "../apiConst";

export const deleteApiRequest = async (url, data) => {
    return await axios.delete(url, {
        headers: {
            "Authorization": ADMIN_AUTH_TOKEN,
        },
        data: {
            id: data
        }
    })
        .then(response => console.log(response))
        .catch(error => console.log(error));
}
