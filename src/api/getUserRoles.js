import axios from "axios";
import {URL_ROLES} from "./apiConst";

export const getUserRoles = async () => {
    let userRoles = [];
    await axios.get(URL_ROLES).then(response => userRoles.push(response.data.data))

    return userRoles;
}
