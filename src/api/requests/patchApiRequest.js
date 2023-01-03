import axios from "axios";
import {ADMIN_AUTH_TOKEN} from "../apiConst";

export const patchApiRequest = async (url, data) => {
    return await axios.patch(url, data, {
        headers: {
            "Authorization": ADMIN_AUTH_TOKEN,
        }
    })
        .then(response => response)
        .catch(error => console.log(error));
}
