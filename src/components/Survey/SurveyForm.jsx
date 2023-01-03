import s from "../../pages/Survey/Survey.module.scss";
import {Button, Slider} from "@mui/material";
import {useState} from "react";
import Question from "./Question";
import {useParams} from "react-router-dom";

const Questions = [[
    {
        text: 'Как вам еда',
        name: 'slider1'
    },
    {
        text: 'Как вам преподавание учителей',
        name: 'slider2'

    },
    {
        text: 'Как вам качество работы учителей',
        name: 'slider3'

    },
    {
        text: 'Нравится ли вам ходить в школу',
        name: 'slider4'

    },
    {
        text: 'Компетентны ли учителя в вашей школы',
        name: 'slider5'

    }
],]
export default function SurveyForm(props) {
    let {id}=useParams()
    let [formValues, setFormValues] = useState({})

    function onchangeValues(e) {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    function FormOnSubmit() {
        console.log(formValues)
    }

    return (
        <div className={s.survey_form}>
            <form className={s.form}>

                {Questions[id].map((e) =>
                    <Question text={e.text}
                              name={e.name}
                              value={formValues[e.name]}
                              onChange={onchangeValues}
                    />
                )}

                <Button className={s.submit_btn}
                        onClick={FormOnSubmit}
                        variant="outlined">Завершить</Button>
            </form>
        </div>
    )
}