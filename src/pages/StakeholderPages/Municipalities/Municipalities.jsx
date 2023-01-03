import { TableContainer, Table, TableHead, TableRow, Paper, TableBody, TableCell, Button } from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import mapObjectResponse from "../../../api/requests/mapObject";

function Municipalities() {
    const [schools, setSchools] = useState([])

    useEffect(() => {
        mapObjectResponse.getMapObjects().then(response => setSchools(response.data))
    }, [])

    return (
        <>
            <h1>Муниципалитеты</h1>
            <Link to={'new'} style={{ textDecoration: 'none' }} >
                    <Button
                        //className={s.buttonAdd}
                        variant={'outlined'}
                    >
                        <AddIcon style={{fontSize: "20px", marginRight: "5px"}}/>
                        Добавить
                    </Button>
                </Link>
            <TableContainer component={Paper} sx={{maxWidth: '60%', margin: '20px auto'}}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Область</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Город</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Школа</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schools.map((school) => (
                            <TableRow
                                key={school.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {school.region}
                                </TableCell>
                                <TableCell>{school.city}</TableCell>
                                <TableCell>{school.name}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default Municipalities;
