import s from '../../components/LoginRegister/LoginPage.module.scss';
import LoginForm from "../../components/LoginRegister/LoginForm";
import Header from "../../components/Layout/Header";


export default function Login() {

    return (
        <div className={s.login_page_container}>
            <LoginForm/>
        </div>
    );
}