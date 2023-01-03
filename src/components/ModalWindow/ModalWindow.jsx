import {Link} from "react-router-dom";
import greenCheckmarksIcon from "../../images/greenCheckmark.png";

import s from "./ModalWindow.module.scss";

function ModalWindow({onClick, header, link}) {
    return (
        <div className={s.modal}>
            <img src={greenCheckmarksIcon} alt={"mark"}/>
            <div className={s.head}>
                {header}
            </div>
            <div className={s.desc}>
                Вы можете покинуть эту страницу.
            </div>
            <Link to={link} style={{ textDecoration: 'none' }}>
                <button className={s.btn} onClick={onClick}>
                    Ок
                </button>
            </Link>

        </div>
    )
}

export default ModalWindow;
