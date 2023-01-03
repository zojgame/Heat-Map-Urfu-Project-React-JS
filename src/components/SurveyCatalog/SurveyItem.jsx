import s from "../../pages/SurveyCatalog/SurveyCatalog.module.scss";
import {NavLink} from "react-router-dom";


export default function SurveyItem(props) {
    return (
        <NavLink className={s.navlink} to={`/surveys/${props.id}`}>
            <div className={s.survey_item}>
                <div className={s.survey_item_theme}>
                    <p>{props.theme}</p>
                </div>
                <div className={s.questions_title_count}>
                    <div className={s.questions_title}>{props.text}</div>
                    <div className={s.questions_count}>{props.count} вопросов</div>
                </div>
            </div>
        </NavLink>
    )
}