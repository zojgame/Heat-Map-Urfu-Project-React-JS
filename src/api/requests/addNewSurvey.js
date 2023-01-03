import axios from "axios";

import {URL_SURVEY, ADMIN_AUTH_TOKEN} from "../apiConst";


const addNewSurvey = async (data) => {
    //console.log(data);

    return await axios.post(URL_SURVEY,data, {
        headers: {
            Authorization: ADMIN_AUTH_TOKEN,
        }
    })
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

export default addNewSurvey;
