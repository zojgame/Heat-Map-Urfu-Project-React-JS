import {MenuItem, TextField} from "@mui/material";
import s from "../../pages/SurveyCatalog/SurveyCatalog.module.scss";


export default function FilterSelect(props) {

    return (
        <TextField className={s.filters_select}
                   value={props.value}
                   onChange={props.onChange}
                   name={props.name}
                   id={`${props.name}-select`}
                   label={props.label}
                   variant="outlined"
                   select
                   size="small"
        >
            {props.values.map((elem) =>
                <MenuItem key={elem} value={elem}>
                    {elem}
                </MenuItem>
            )
            }
        </TextField>
    )
}