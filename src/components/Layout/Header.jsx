import {NavLink} from "react-router-dom";
import {useState} from "react";

import s from "./Header.module.scss";
import {useCookies} from "react-cookie";
import {getUserRoles} from "../../api/getUserRoles";


export default function Header() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cookies, setCookies] = useCookies();

    const linksAdmin = [
        {name: 'Опросы', linkSrc: '/stakeholder/surveys'},
        {name: 'Муниципалитеты', linkSrc: '/stakeholder/municipalities'},
        {name: 'Результаты', linkSrc: '/stakeholder/results'},
        {name: 'Карта', linkSrc: '/stakeholder/map'},
        {name: 'Управление', linkSrc: '/stakeholder/manage'},
        {name: 'Личный кабинет', linkSrc: '/profile'},
        {name: 'Войти / Зарегистрироваться', linkSrc: '/login'},
    ]

    const linksUser = [
        {name: 'Опросы', linkSrc: '/stakeholder/surveys'},
        {name: 'Личный кабинет', linkSrc: '/profile'},
        {name: 'Войти / Зарегистрироваться', linkSrc: '/login'},
    ]

    let links = []
    if (cookies.userRole[0] >= 1 && cookies.userRole[0] <= 4) {
        links = linksUser
    } else {
        links = linksAdmin
    }

    const handleClickLink = (index) => {
        setActiveIndex(index)
    }

    return (
        <header className={s.header}>
            <div className={s.header_logo}>
                <NavLink to={'/'}><img src={require('../../images/logo.png')} className={s.logo} alt=""/></NavLink>
            </div>
            <div className={s.navbar}>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <NavLink className={`${s.navlink} ${activeIndex === index ? s.selected : ''}`}
                                     to={link.linkSrc}
                                     onClick={() => handleClickLink(index)}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}

                </ul>
            </div>
        </header>
    )
}
