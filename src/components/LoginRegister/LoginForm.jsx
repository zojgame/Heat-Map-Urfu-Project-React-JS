import s from "./LoginPage.module.scss";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Link} from "react-router-dom";
import GoogleLogin from "react-google-login";
import {useState} from "react";
import auth from "../../api/requests/auth";
import {useCookies} from "react-cookie";

export default function LoginForm() {

    const [cookies, setCookie] = useCookies();

    const [loginValues, setLoginLoginValues] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(true);

    const showPasswordOnChange = () => {
        setShowPassword(!showPassword)
    }


    function onchangeValues(e) {
        setLoginLoginValues({...loginValues, [e.target.name]: e.target.value})
    }

    function formOnSubmit() {
        auth(loginValues)
            .then(res => res.data)
            .then(data => {
                setCookie('userToken', `Bearer ${data.token}`)
                setCookie('userRole', data.user.roles)
            })
            .then(res3 => console.log(cookies))
    }

    return (
        <div className={s.login_page_content}>
            <div className={s.login_page_form_container}>
                <h1 className={s.login_page_title}>Здравствуйте!</h1>
                <div className={s.login_page_form}>
                    <TextField className={s.login_page_form_input}
                               id="outlined-basic"
                               label="Введите вашу почту"
                               name={'email'}
                               value={loginValues.email}
                               onChange={(e) => onchangeValues(e)}
                               variant="outlined"/>
                    <TextField className={s.login_page_form_input}
                               type={showPassword ? "password" : "text"}
                               label="Введите пароль"
                               name={'password'}
                               value={loginValues.password}
                               onChange={(e) => onchangeValues(e)}
                               placeholder="Введите пароль"
                               variant="outlined"
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton aria-label="toggle password"
                                                       edge="end"
                                                       onClick={showPasswordOnChange}
                                           >
                                               {
                                                   showPassword
                                                       ? <VisibilityOffIcon/>
                                                       : <VisibilityIcon/>
                                               }
                                           </IconButton>
                                       </InputAdornment>
                                   )
                               }}
                    />
                    <div className={s.login_page_submit_btns}>
                        <div className={s.login_register_container}>
                            <Button onClick={formOnSubmit} className={s.login_page_login_btn}
                                    variant="outlined">Войти</Button>
                            <Link className={s.login_page_reg_link} to='/register'>Нет аккаунта?</Link>
                        </div>
                        <GoogleLogin
                            className={s.google_btn}
                            clientId=""
                            buttonText="Войти через Google"
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
