import s from "../../pages/Survey/Survey.module.scss";
import {Slider} from "@mui/material";
import style from './questionslider.css'


export default function Question(props) {
    const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(elem => {
        return {value: elem, marks: `${elem}`}
    })
    return (
        <div className={s.question}>
            <label>
                {props.text}
            </label>
            <Slider
                sx={props.value !== undefined
                    ? {
                        '& .MuiSlider-thumb': {
                            color: '#597EF7'
                        }
                    }
                    : {
                        '& .MuiSlider-thumb': {
                            color: 'darkgray'
                        }
                    }}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                className={s.slider}
                defaultValue={1}
                track={false}
                step={1}
                min={1}
                max={10}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </div>
    )
}