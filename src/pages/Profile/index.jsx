import {useState} from "react";

import {Button, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import inputIcon from "../../images/inputIcon.svg";
import passwordIconClose from "../../images/EyeInvisible.svg";
import passwordIconOpen from "../../images/eye.svg";

import s from "./Profile.module.scss";


export default function Profile() {
    const [userState, setUserState] = useState({
        name: "name",
        birthDate: "26.09.2002",
        email: "example@urfu.me",
        password: "password",
    });

    const [isShowPassword, setShowPassword] = useState(false);
    const [isReadonlyName, setIsReadonlyName] = useState(true);
    const [isReadonlyEmail, setIsReadonlyEmail] = useState(true);

    const handleChangeCheckbox = () => {

    }

    const handleChangeField = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={s.root}>
            <TextField
                className={s.field}
                key={1}
                label={isReadonlyName ? "имя" : "редактировать имя"}
                value={userState.name}
                name={"name"}
                onChange={handleChangeField}
                size={"small"}
                style={{color: '#1890FF', borderColor: '#1890FF'}}
                InputProps={{
                    readOnly: isReadonlyName,
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            {isReadonlyName
                                ? <img className={s.icon} src={inputIcon} alt={""}
                                       onClick={() => setIsReadonlyName(!isReadonlyName)}/>
                                : <DoneIcon style={{color: "green", cursor: "pointer"}}
                                            onClick={() => setIsReadonlyName(!isReadonlyName)}/>
                            }

                        </InputAdornment>
                    )
                }}
            />
            <TextField
                className={s.field}
                key={2}
                label="Дата рождения"
                defaultValue="26.09.2002"
                size={"small"}
                style={{color: '#1890FF', borderColor: '#1890FF'}}
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                className={s.field}
                key={3}
                label={isReadonlyEmail ? "Почта" : "редактировать почту"}
                defaultValue="example@urfu.me"
                size={"small"}
                style={{color: '#1890FF', borderColor: '#1890FF'}}
                InputProps={{
                    readOnly: isReadonlyEmail,
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            {isReadonlyEmail
                                ? <img className={s.icon} src={inputIcon} alt={""} onClick={() => {
                                    setIsReadonlyEmail(!isReadonlyEmail)
                                }}/>
                                : <DoneIcon style={{color: "green", cursor: "pointer"}}
                                            onClick={() => setIsReadonlyEmail(!isReadonlyEmail)}/>
                            }

                        </InputAdornment>
                    )
                }}
            />
            <TextField
                className={s.field}
                key={4}
                label="пароль"
                defaultValue="пароль"
                size={"small"}
                type={isShowPassword ? "text" : "password"}
                style={{color: '#1890FF', borderColor: '#1890FF'}}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position={"end"}>
                            {isShowPassword
                                ? <img className={s.icon} src={passwordIconClose} alt={""}
                                       onClick={() => setShowPassword(!isShowPassword)}/>
                                : <img className={s.icon} src={passwordIconOpen} alt={""}
                                       onClick={() => setShowPassword(!isShowPassword)}/>
                            }

                        </InputAdornment>
                    )
                }}
            />

            <Button variant={"contained"}>
                Сменить пароль
            </Button>
            <FormGroup className={s.checkboxes}>
                <FormControlLabel
                    control={
                        <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox} name={"ученики"}/>}
                    label={"Ученик"}
                />
                <FormControlLabel
                    control={
                        <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox} name={"родители"}/>}
                    label={"Родитель"}
                />
                <FormControlLabel
                    control={
                        <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox} name={"работники"}/>}
                    label={"Работник"}
                />
            </FormGroup>
        </div>
    )
}
