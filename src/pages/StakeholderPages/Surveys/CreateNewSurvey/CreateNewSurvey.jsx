import {useState} from "react";
import {
    Autocomplete,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    Step,
    StepConnector,
    stepConnectorClasses,
    StepLabel,
    Stepper,
    styled,
    TextareaAutosize,
    TextField
} from "@mui/material";

import addNewSurvey from "../../../../api/requests/addNewSurvey.js"
import PlusIcon from "../../../../images/plusIcon"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";

import s from "./CreateNewSurvey.module.scss";


function CreateNewSurvey() {
    const [activeStep, setActiveStep] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [isBtnActive, setIsBtnActive] = useState(true);
    const [loader, setLoader] = useState(false);

    const [surveyState, setSurveyState] = useState({
        surveyThemeValue: '',
        targetAudience: {
            "родители": false,
            "ученики": false,
            "работники": false,
        },
        questions: [],
    });

    const surveyThemes = ["Преподователи", "Ремонт", "Питание", "Зарплата"];

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

    const handleChangeCheckbox = (e) => {
        setSurveyState({
            ...surveyState,
            targetAudience: {
                ...surveyState.targetAudience,
                [e.target.name]: e.target.checked
            }
        });
        setActiveStep(2);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    let [textAreasTemplate, setTextAreasTemplate] = useState([])

    const handleAddButton = () => {
        const index = textAreasTemplate.length + 1;
        setTextAreasTemplate(textAreasTemplate.concat(<TextareaAutosize
            key={index}
            value={surveyState.questions[index]}
            onChange={(e) => {
                setSurveyState({
                    ...surveyState,
                    questions: [
                        ...surveyState.questions,
                        e.target.value
                    ]
                });
                setActiveStep(3);
                setIsBtnActive(true);
            }}
            className={s.textarea}
            placeholder="Напишите вопрос"
            style={{height: 54, borderColor: "#D9D9D9"}}
        />))

        setIsBtnActive(false);
    }

    const handleSendBtnClick = async () => {
        setLoader(true);
        const userRoles = [];
        if (surveyState.targetAudience.ученики) userRoles.push(1);
        if (surveyState.targetAudience.работники) userRoles.push(2);
        if (surveyState.targetAudience.родители) userRoles.push(3)
        const data = {
            "name": surveyState.surveyThemeValue,
            "user_roles": userRoles,
            "criteria": surveyState.questions
        }

        await addNewSurvey(data)

        setLoader(false);
        setOpenModal(true)
        setActiveStep(4)
    }

    return (
        <>
            <h1 className={s.header}>Создайте опрос для нужного муниципалитета</h1>
            <div className={s.container}>
                <div className={s.steps}>
                    <Stepper activeStep={activeStep} orientation={"vertical"} connector={<CustomConnector/>}>
                        <Step key={1} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Выбор темы опроса
                                </div>
                                <div className={s.description}>
                                    Выбирайте между существующих или вводите свою
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={2} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Определение целевой аудитории
                                </div>
                                <div className={s.description}>
                                    Для кого вы создаете опрос?
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={3} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Добавление вопросов
                                </div>
                                <div className={s.description}>
                                    Напишите все необходимые вопросы
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={4} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Публикация опроса
                                </div>
                                <div className={s.description}>
                                    Сделайте опрос доступным для пользователей
                                </div>
                            </StepLabel>
                        </Step>

                    </Stepper>

                </div>

                <div className={s.block}>
                    <Autocomplete
                        id={"surveyTheme"}
                        value={surveyState.surveyThemeValue}
                        onChange={(e, newValue) => {
                            setSurveyState({
                                ...surveyState,
                                surveyThemeValue: newValue
                            });
                            setActiveStep(1);
                        }}
                        renderInput={(params => <TextField {...params} label={"Тема опроса"}/>)}
                        options={surveyThemes}
                        sx={{width: 400, height: 32}}
                        freeSolo
                    />
                    <FormGroup className={s.checkboxes}>
                        <FormControlLabel
                            control={
                                <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox} name={"родители"}/>}
                            label={"Родители"}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox} name={"ученики"}/>}
                            label={"Ученики"}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox sx={{color: "#D9D9D9"}} onChange={handleChangeCheckbox} name={"работники"}/>}
                            label={"Работники"}
                        />
                    </FormGroup>

                    <div className={s.area}>
                        {textAreasTemplate}

                        <button className={`${s.addButton} ${isBtnActive && s.addButton_active}`}
                                onClick={handleAddButton} disabled={!isBtnActive}>
                            <PlusIcon isWhite={isBtnActive}/>
                        </button>
                    </div>

                    <Button
                        className={s.publishButton}
                        variant={"contained"}
                        disabled={activeStep !== 3}
                        onClick={handleSendBtnClick}
                    >
                        {loader ? "загружаем.." : "Опубликовать"}
                    </Button>

                    <Modal
                        open={openModal}
                        close={() => setOpenModal(false)}
                    >
                        <ModalWindow onClick={handleCloseModal} header={"Ваш опрос опубликован!"} link={"/stakeholder/surveys"}/>
                    </Modal>

                </div>
            </div>
        </>
    )
}

export default CreateNewSurvey;
