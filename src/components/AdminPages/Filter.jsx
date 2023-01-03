import s from "./Filter.module.scss";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";


export default function Filter () {
    const handleChangeInput = () => {

    }

    return (
        <div className={s.filters}>
            <div className={s.block}>
                <h4>Роль</h4>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="gilad" />
                        }
                        label="Родитель"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="jason" />
                        }
                        label="Ученик"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="antoine" />
                        }
                        label="Преподаватель"
                    />
                </FormGroup>
            </div>

            <div className={s.block}>
                <h4>Область</h4>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="gilad" />
                        }
                        label="Свердловская"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="jason" />
                        }
                        label="Москва и МО"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="antoine" />
                        }
                        label="Краснодарский край"
                    />
                </FormGroup>
            </div>

            <div className={s.block}>
                <h4>Город</h4>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="Екатеринбург" />
                        }
                        label="Екатеринбург"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="Москва" />
                        }
                        label="Москва"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="Санкт-Петербург" />
                        }
                        label="Санкт-Петербург"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} name="Краснодар" />
                        }
                        label="Краснодар"
                    />
                </FormGroup>
            </div>
            <div className={s.block}>
                <h4>Школа</h4>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} />
                        }
                        label="№177"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} />
                        }
                        label="№125"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} />
                        }
                        label="№4"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox sx={{color: "#D9D9D9"}} checked={false} onChange={handleChangeInput} />
                        }
                        label="№1712"
                    />
                </FormGroup>
            </div>
        </div>
    )
}
