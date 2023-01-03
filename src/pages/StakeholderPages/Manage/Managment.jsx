import {useCallback, useEffect, useState} from "react";

import {Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import s from "./Managment.module.scss";
import {postApiRequest} from "../../../api/requests/postApiRequest";
import {URL_STAKEHOLDER} from "../../../api/apiConst";
import {getApiRequest} from "../../../api/requests/getApiRequest";
import {deleteApiRequest} from "../../../api/requests/deleteApiRequest";
import {patchApiRequest} from "../../../api/requests/patchApiRequest";


function Managment() {
    const [stakeholders, setStakeholders] = useState([]);
    const [stakeholder, setStakeholder] = useState({
        email: "",
        name: "",
        //permissions: {}
    })
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [editableRowIndex, setEditableRowIndex] = useState(false);

    // const getData = useCallback(async () => {
    //     await getApiRequest(URL_STAKEHOLDER).then(response => setStakeholders(response.data))
    //     //console.log(stakeholders)
    // }, [])

    useEffect(() => {
        getApiRequest(URL_STAKEHOLDER).then(response => setStakeholders(response.data))
    }, [])

    const handleAddButton = () => {
        setIsOpenModal(true);
    }

    const handleChangeInput = (e) => {
        setStakeholder({
            ...stakeholder,
            [e.target.name]: e.target.value
        })
    }

    // const handleChangeCheckbox = (e) => {
    //     setStakeholder({
    //         ...stakeholder,
    //         permissions: {
    //             ...stakeholder.permissions,
    //             [e.target.name]: e.target.checked
    //         }
    //     })
    // }

    const handleCancelClick = () => {
        setIsOpenModal(false);
        setStakeholder({});
        setEditableRowIndex(false);
    }

    const handleSaveBtnClick = async () => {
        //await postApiRequest(URL_STAKEHOLDER, data)

        editableRowIndex !== false
            ?
            await patchApiRequest(URL_STAKEHOLDER, stakeholder).then(response => {
                if (response.status === 200) {
                    setStakeholders(stakeholders.map((obj, i) => {
                        if (editableRowIndex === i) {
                            return {
                                ...response.data
                            }
                        }
                        return obj;
                    }))
                }
            })

            : await postApiRequest(URL_STAKEHOLDER, stakeholder).then(response => {
                if (response.status === 200) {
                    setStakeholders([
                        ...stakeholders,
                        response.data
                    ]);
                }
            })


        setIsOpenModal(false);
        setStakeholder({})
        setEditableRowIndex(false)
    }

    const handleEditClick = (rowIndex) => {
        console.log(stakeholders[rowIndex]);
        setEditableRowIndex(rowIndex);
        setStakeholder(stakeholders[rowIndex]);
        setIsOpenModal(true);
    }

    const handleDelete = (rowIndex) => {
        const deletedStakeholderID = stakeholders[rowIndex].id;
        console.log(deletedStakeholderID);
        setStakeholders(stakeholders.filter((item, index) => index !== rowIndex))
        deleteApiRequest(URL_STAKEHOLDER, deletedStakeholderID).then(res => res);
    }


    return (
        <div className={s.pageContainer}>
            <div className={s.pageTitle}>
                <h1>
                    Здесь вы можете редактировать стейкхолдеров
                </h1>
                <Button
                    className={s.buttonAdd}
                    variant={'outlined'}
                    onClick={handleAddButton}
                >
                    <AddIcon style={{fontSize: "20px", marginRight: "5px"}}/>
                    Добавить стейкхолдера
                </Button>
            </div>

            <Table sx={{minWidth: 350, maxWidth: 1170}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{background: "#FAFAFA"}}>
                        <TableCell sx={{fontWeight: 700}}>ФИО стейкхолдеров</TableCell>
                        <TableCell sx={{fontWeight: 700}}>Почта</TableCell>
                        <TableCell sx={{fontWeight: 700}} align="right">Управление</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stakeholders.map((stakeholder, index) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {stakeholder.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {stakeholder.email}
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    endIcon={<BorderColorIcon sx={{width: 12}}/>}
                                    size={"small"}
                                    sx={{
                                        backgroundColor: '#F6FFED',
                                        color: '#52C41A',
                                        borderColor: '#B7EB8F',
                                        '&:hover': {backgroundColor: '#e6ffc0', borderColor: '#B7EB8F'}
                                    }}
                                    onClick={() => handleEditClick(index)}
                                >
                                    Редактировать
                                </Button>
                                <Button variant="outlined"
                                        endIcon={<DeleteIcon sx={{width: 14}}/>}
                                        size={"small"}
                                        sx={{
                                            backgroundColor: '#FFF1F0',
                                            color: '#F5222D',
                                            borderColor: '#FFA39E',
                                            marginLeft: 1,
                                            '&:hover': {backgroundColor: '#fff5f5', borderColor: '#FFA39E'}
                                        }}
                                        onClick={() => handleDelete(index)}
                                >
                                    Удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            <Modal
                open={isOpenModal}
                onClose={() => {
                    setIsOpenModal(false);
                    setStakeholder({})
                    setEditableRowIndex(false)
                }}
            >
                <div className={s.modal}>
                    <div className={s.head}>
                        Добавить нового стейкхолдера
                    </div>
                    <div className={s.content}>
                        <TextField
                            variant={"outlined"}
                            label={"Введите почту"}
                            size={"small"}
                            sx={{width: 250}}
                            name={"email"}
                            key={"email"}
                            value={stakeholder.email}
                            onChange={handleChangeInput}
                        />
                        <TextField
                            variant={"outlined"}
                            label={"Введите ФИО"}
                            size={"small"}
                            name={"name"}
                            key={"name"}
                            sx={{width: 250}}
                            value={stakeholder.name}
                            onChange={handleChangeInput}
                        />
                        {/*<h3>Выберите доступные права </h3>*/}
                        {/*<FormGroup className={s.checkboxes}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={*/}
                        {/*            <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox}*/}
                        {/*                      name={"mapAccess"}/>}*/}
                        {/*        label={"Доступ к тепловой карте"}*/}
                        {/*    />*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={*/}
                        {/*            <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox}*/}
                        {/*                      name={"addUserAcsess"}/>}*/}
                        {/*        label={"Добавление других стейкхолдеров"}*/}
                        {/*    />*/}
                        {/*</FormGroup>*/}
                    </div>
                    <div className={s.foot}>
                        <Button
                            onClick={handleCancelClick}
                            variant={"outlined"}
                            size={"small"}
                        >
                            отменить
                        </Button>
                        <Button
                            onClick={handleSaveBtnClick}
                            variant={"contained"}
                            size={"small"}
                            sx={{backgroundColor: '#1890FF', boxShadow: 0}}
                        >
                            сохранить
                        </Button>
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default Managment;
