import s from '../../components/LoginRegister/LoginPage.module.scss';
import RegisterForm from "../../components/LoginRegister/RegisterForm";



export default function Register() {

    return (
        <div className={s.login_page_container}>
            <RegisterForm/>
        </div>
    );
}