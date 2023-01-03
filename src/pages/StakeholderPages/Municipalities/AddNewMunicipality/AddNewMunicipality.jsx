import {useState} from "react";
import axios from "axios";
import {
    Autocomplete,
    Button,
    Modal,
    Step,
    StepConnector,
    stepConnectorClasses,
    StepLabel,
    Stepper,
    styled,
    TextField
} from "@mui/material";
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";

import s from "./AddNewMunicipalitet.module.scss";
import mapObject from "../../../../api/requests/mapObject";


function AddNewMunicipality() {
    const [activeStep, setActiveStep] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const [state, setState] = useState({
        oblast: "",
        city: "",
        school: "",
    });
    console.log(state);


    const CustomConnector = styled(StepConnector)(() => ({
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#91D5FF',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#91D5FF',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            minHeight: 35
        },
    }));

    const handleChangeInput = (e, editField, stepCount) => {
        setState({
            ...state,
            [editField]: e.target.value
        });
        setActiveStep(stepCount)
    }

    const handleSendBtnClick = async () => {
        setLoader(true);
        let data = {}
        const searchText = `${state.oblast},${state.city},${state.school}`

        await axios.get(`https://search-maps.yandex.ru/v1/?text=${searchText}&type=biz&lang=ru_RU&apikey=5cee4c28-3109-47df-94ac-b2ff7149f2ee`)
            .then(res => res.data.features[0])
            .then(obj => {
                data = {
                    "name": obj.properties.name,
                    "latitude": obj.geometry.coordinates[1],
                    "longitude": obj.geometry.coordinates[0],
                    "city": state.city,
                    "region": state.oblast
                }
                console.log("добавленные", data);
                mapObject.addMapObject(data)
                setLoader(false)
                setOpenModal(true)
                setActiveStep(4)
            })
            .catch(err => console.log(err))
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <>
            <h1 className={s.header}>В этом разделе вы можете добавить новое учебное заведение</h1>
            <div className={s.container}>
                <div className={s.steps}>
                    <Stepper activeStep={activeStep} orientation={"vertical"} connector={<CustomConnector/>}>
                        <Step key={1} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Установление области
                                </div>
                                <div className={s.description}>
                                    Выбирите или введите область
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={2} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Установление города
                                </div>
                                <div className={s.description}>
                                    Выберите или введите город
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={3} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Добавление школы
                                </div>
                                <div className={s.description}>
                                    Напишите название учебного заведения
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={4} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Сохранение
                                </div>
                                <div className={s.description}>
                                    Не забудьте сохранить данные
                                </div>
                            </StepLabel>
                        </Step>

                    </Stepper>

                </div>

                <div className={s.block}>
                    <Autocomplete
                        key={"oblast"}
                        value={state.oblast}
                        onChange={(e, newValue) => {
                            setState({
                                ...state,
                                oblast: newValue
                            });
                            setActiveStep(1);
                        }}
                        renderInput={(params => <TextField {...params}
                                                           label={"Выберите область"}
                                                           onChange={(e) => handleChangeInput(e, "oblast", 1)}/>
                        )}
                        options={["Свердловская"]}
                        freeSolo
                    />
                    <Autocomplete
                        key={"city"}
                        value={state.city}
                        onChange={(e, newValue) => {
                            setState({
                                ...state,
                                city: newValue
                            });
                            setActiveStep(2);
                        }}
                        renderInput={(params => <TextField {...params}
                                                           onChange={(e) => handleChangeInput(e, "city", 2)}
                                                           label={"Выберите город"}/>
                        )}
                        options={["Екатеринбург", "Нижний тагил", "Первоуральск", "Серов", "Верхняя Пышма"]}
                        freeSolo
                    />

                    <TextField
                        key="schoolNumber"
                        label="Введите название школы"
                        variant="outlined"
                        value={state.school}
                        onChange={e => handleChangeInput(e, "school", 3)}

                    />

                    <Button
                        className={s.publishButton}
                        variant={"contained"}
                        disabled={activeStep !== 3}
                        onClick={handleSendBtnClick}
                    >
                        {loader ? "сохранение.." : "Сохранить"}
                    </Button>

                    <Modal
                        open={openModal}
                        close={() => setOpenModal(false)}
                    >
                        <ModalWindow onClick={handleCloseModal} header={"Муниципалитет добавлен!"}
                                     link={"/stakeholder/municipalities"}/>
                    </Modal>

                </div>
            </div>
        </>
    )
}

export default AddNewMunicipality;
