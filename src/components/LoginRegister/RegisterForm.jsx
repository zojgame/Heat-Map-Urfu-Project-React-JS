import s from "./LoginPage.module.scss";
import {
    Button,
    Checkbox, FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListItemText from '@mui/material/ListItemText';
import {useState} from "react";
import Select from '@mui/material/Select';
import register from "../../api/requests/register";
import {useNavigate} from "react-router-dom";


export default function RegisterForm() {

    const roles = [
        {
            role: 'Ученик',
            id: 1
        },
        {
            role: 'Учитель',
            id: 2
        },
        {
            role: 'Родитель',
            id: 3
        }
    ];

    const [registerValues, setRegisterValues] = useState({
        name: '',
        age: '',
        email: '',
        roles: [],
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(true);


    const showPasswordOnChange = () => {
        setShowPassword(!showPassword)
    }

    function onchangeValues(e) {
        setRegisterValues({...registerValues, [e.target.name]: e.target.value})
    }

    const roleOnChange = (e) => {
        const {
            target: {value},
        } = e;
        setRegisterValues({
                ...registerValues,
                roles: typeof value === 'string' ? value.split(',') : value
            }
        )
    }

    const formOnSubmit = () => {
        let currentRoles=roles.filter(elem=>registerValues.roles.includes(elem.role))
        register({
            ...registerValues, roles:currentRoles.map(elem=>elem.id)
        }).then(res => console.log(res))

    }

    return (
        <div className={s.login_page_content}>
            <div className={s.login_page_form_container}>
                <h1 className={s.login_page_title}>Здравствуйте! Пожалуйста зарегистрируйтесь</h1>
                <div className={s.login_page_form}>
                    <TextField className={s.login_page_form_input}
                               name={'name'}
                               id="outlined-basic"
                               label="Введите ваше ФИО"
                               value={registerValues.name}
                               onChange={(e) => onchangeValues(e)}
                               variant="outlined"/>
                    <TextField className={s.login_page_form_input}
                               name={'email'}
                               id="outlined-basic"
                               label="Введите вашу почту"
                               value={registerValues.email}
                               onChange={(e) => onchangeValues(e)}
                               variant="outlined"/>
                    <TextField className={s.login_page_form_input}
                               name={'age'}
                               id="outlined-basic"
                               type='number'
                               label="Ваш возраст"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               value={registerValues.age}
                               onChange={(e) => onchangeValues(e)}
                               variant="outlined"/>
                    <FormControl>
                        <InputLabel>Кем являетесь</InputLabel>
                        <Select
                            name={'role'}
                            className={s.login_page_form_input}
                            multiple
                            value={registerValues.roles}
                            input={<OutlinedInput label="Кем являетесь"/>}
                            onChange={(e) => roleOnChange(e)}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {roles.map((elem) => (
                                <MenuItem key={elem.role} value={elem.role}>
                                    <Checkbox checked={registerValues.roles.indexOf(elem.role) > -1}/>
                                    <ListItemText primary={elem.role}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField className={s.login_page_form_input}
                               name={'password'}
                               type={showPassword ? "password" : "text"}
                               label="Введите пароль"
                               value={registerValues.password}
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
                    <TextField className={s.login_page_form_input}
                               name={'confirmPassword'}
                               type={showPassword ? "password" : "text"}
                               label="Подтвердите пароль"
                               value={registerValues.confirmPassword}
                               onChange={(e) => onchangeValues(e)}
                               placeholder="Введите пароль"
                               variant="outlined"

                    />

                    <div className={s.login_page_submit_btns}>
                        <div className={s.login_register_container}>
                            <Button onClick={formOnSubmit} className={s.login_page_login_btn}
                                    variant="outlined">Зарегистрироваться</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}