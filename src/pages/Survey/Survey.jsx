import s from './Survey.module.scss'
import {Button, Slider} from "@mui/material";
import {useState} from "react";
import SurveyForm from "../../components/Survey/SurveyForm";


export default function Survey(props){
    return(
        <div className={s.survey_page_container}>
            <div className={s.survey_title}>
                <h1>
                    Оцените количество домашней работы,sdsdsdssd ssddsdsdsd xcc fgfgtgggggg
                    fgffffff gggfgfgf gfgffff ggggfgf ggggggf gggggfgg
                </h1>
                <span></span>
            </div>
            <SurveyForm />
        </div>
    )
}