import axios from "axios";

import {ADMIN_AUTH_TOKEN, URL_MAPOBJECT, URL_MAPOBJECTS} from "../apiConst";


export const getMapObjects = async () => {
    return await axios.get(URL_MAPOBJECTS, {
        headers: {
            Authorization: ADMIN_AUTH_TOKEN,
        }
    })
        .then(response => response.data)
        .catch(error => console.log(error))
}

const addMapObject = async (data) => {
    return await axios.post(URL_MAPOBJECT, data, {
        headers: {
            "Authorization": ADMIN_AUTH_TOKEN,
        }
    })
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

const mapObjectResponse = {
    getMapObjects,
    addMapObject
}

export default mapObjectResponse;
