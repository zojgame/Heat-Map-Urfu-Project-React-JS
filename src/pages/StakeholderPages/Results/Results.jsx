import {
    useEffect, useState
} from "react";

import {Button, Table, TableCell, TableHead, TableRow} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import s from "./Results.module.scss";
import {Link} from "react-router-dom";
import Filter from "../../../components/AdminPages/Filter";

import resultsResponse from "../../../api/requests/results";


function Results() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        resultsResponse.getResults().then(response => setResults(response.data));
    }, [])

    // let Results = [];
    // for (let i = 0; i < 200; i++) {
    //     Results.push({login: "login", result: i})
    // }


    return (
        <div className={s.pageContainer}>
            <div className={s.pageTitle}>
                <h1>
                    В этом разделе можно просмотреть и внести результаты опросов
                </h1>

                <Link to={'new'} style={{ textDecoration: 'none' }}>
                    <Button
                        className={s.buttonAdd}
                        variant={'outlined'}
                        //onClick={handleAddButton}
                    >
                        <AddIcon style={{fontSize: "20px", marginRight: "5px"}}/>
                        Добавить данные
                    </Button>
                </Link>

            </div>

            <div className={s.body}>
                <Table className={s.table} sx={{minWidth: 350, maxWidth: 1170}} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{background: "#FAFAFA"}}>
                            <TableCell sx={{fontWeight: 700}}>Логин пользователя</TableCell>
                            <TableCell sx={{fontWeight: 700, width: 270}} align="left">Результат опросов (средняя оценка)</TableCell>
                        </TableRow>
                    </TableHead>

                    {results.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {item.user.name}
                            </TableCell>
                            <TableCell align={"left"} sx={{width: 270}}>
                                {item.score}
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                <Filter />
            </div>

        </div>
    )
}


export default Results;
