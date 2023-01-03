import axios from "axios";

import {ADMIN_AUTH_TOKEN, URL_RESULTS} from "../apiConst";


const getResults = async () => {
    return await axios.get(URL_RESULTS, {
        headers: {
            Authorization: ADMIN_AUTH_TOKEN,
        }
    })
        .then(response => response.data)
        .catch(error => console.log(error))
}

const resultsResponse = {
    getResults,
}

export default resultsResponse;
