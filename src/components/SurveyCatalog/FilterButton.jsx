import {Button} from "@mui/material";

export default function FilterButton(props){
    return(
        <Button onClick={props.onClick} sx={{
            background: '#1890FF',
            borderRadius: '15px'
        }} variant="contained">{props.text}</Button>
    )
}