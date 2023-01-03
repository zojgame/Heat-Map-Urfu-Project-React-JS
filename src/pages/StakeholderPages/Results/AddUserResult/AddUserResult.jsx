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
    TextField
} from "@mui/material";

import addNewSurvey from "../../../../api/requests/addNewSurvey.js"
import PlusIcon from "../../../../images/plusIcon"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";

import s from "./AddUserResult.module.scss";
import {postApiRequest} from "../../../../api/requests/postApiRequest";
import {URL_RESULT, URL_RESULTS} from "../../../../api/apiConst";


function AddUserResult() {
    const [activeStep, setActiveStep] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [isBtnActive, setIsBtnActive] = useState(true);

    const [resultState, setResultState] = useState({
        oblast: '',
        city: '',
        school: '',
        surveyThemeValue: '',
        surveyHeader: '',
        targetAudience: {
            "родители": false,
            "ученики": false,
            "работники": false,
        },
        questionsResults: [],
    });
    console.log(resultState);

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

    const handleChangeInput = (event, newValue) => {
        console.log(event.target);
        console.log(event.target.name);
        console.log(newValue);
        // setResultState({
        //         ...resultState,
        //         [event.target.name]: newValue
        //     }
        // )
    }

    const handleChangeCheckbox = (e) => {
        setResultState({
            ...resultState,
            targetAudience: {
                ...resultState.targetAudience,
                [e.target.name]: e.target.checked
            }
        });
        setActiveStep(3);
    }

    const handleSendBtnClick = async () => {
        // const data = {
        //     "name": resultState.surveyThemeValue,
        //     "user_role": 1,
        //     "criteria": resultState.questionsResults
        // }

        //addNewSurvey(data).then(res => console.log(res))

        const data = {
            "object_id": 17,
            "criteria_id": 49,
            "score": 10,

            "survey_id": 24,
            "user_id": 29
        }

        await postApiRequest(URL_RESULTS, data).then(res => console.log(res))

        setOpenModal(true)
        setActiveStep(5)
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    let [textAreasTemplate, setTextAreasTemplate] = useState([])

    const handleAddButton = () => {
        const index = textAreasTemplate.length - 1;

        setTextAreasTemplate(textAreasTemplate.concat(
            <TextField label={"Введите оценку "}
                       size={"small"}
                       className={s.textField}
                       key={index}
                       value={resultState.questionsResults[index]}
                       onChange={(e) => {
                           setResultState({
                               ...resultState,
                               questionsResults: [...resultState.questionsResults.slice(0, index), e.target.value,...resultState.questionsResults.slice(index + 1)]
                           })
                           setActiveStep(4);
                           setIsBtnActive(true)
                       }}
            />
        ))

        // setTextAreasTemplate(textAreasTemplate.concat(<TextareaAutosize
        //     key={index}
        //     value={surveyState.questions[index]}
        //     onChange={(e) => {
        //         setSurveyState({
        //             ...surveyState,
        //             questions: [
        //                 ...surveyState.questions,
        //                 e.target.value
        //             ]
        //         });
        //         setActiveStep(4);
        //         setIsBtnActive(true);
        //     }}
        //     className={s.textarea}
        //     placeholder="Напишите вопрос"
        //     style={{height: 54, borderColor: "#D9D9D9"}}
        // />))

        setIsBtnActive(false);
    }

    return (
        <>
            <h1 className={s.header}>Внесите результаты опроса за другого пользователя</h1>
            <div className={s.container}>
                <div className={s.steps}>
                    <Stepper activeStep={activeStep} orientation={"vertical"} connector={<CustomConnector/>}>
                        <Step key={1} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Выбор местоположения
                                </div>
                                <div className={s.description}>
                                    Выберите область, город и школу
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={2} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Описание темы и заголовка опроса
                                </div>
                                <div className={s.description}>
                                    Выберите или введите свою тему и заголовок
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={3} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Определение целевой аудитории
                                </div>
                                <div className={s.description}>
                                    Кто проходил данный опрос?
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={4} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Добавление ответов
                                </div>
                                <div className={s.description}>
                                    Введите оценки опрашиваемых
                                </div>
                            </StepLabel>
                        </Step>

                        <Step key={5} className={s.step}>
                            <StepLabel>
                                <div className={s.head}>
                                    Публикация результатов
                                </div>
                                <div className={s.description}>
                                    Сделайти результаты доступными для статистики
                                </div>
                            </StepLabel>
                        </Step>

                    </Stepper>

                </div>

                <div className={s.block}>
                    <div className={s.blockItem}>
                        <Autocomplete
                            key={"oblast"}
                            name={"oblast"}
                            //  value={resultState.oblast}
                            // onChange={(e, newValue) => {
                            //     setResultState({
                            //         ...resultState,
                            //         surveyThemeValue: newValue
                            //     });
                            //     setActiveStep(1);
                            // }}
                            renderInput={(params => <TextField {...params} label={"Выберите область"}/>)}
                            options={["Свердловская"]}
                            onChange={handleChangeInput}
                            sx={{width: 250, height: 32}}
                            size={"small"}
                        />
                        <Autocomplete
                            key={"city"}
                            //value={surveyState.surveyThemeValue}
                            renderInput={(params => <TextField {...params} label={"Выберите город"}/>)}
                            options={["Екатеринбург"]}
                            sx={{width: 250, height: 32}}
                            size={"small"}
                        />
                        <Autocomplete
                            key={"school"}
                            //value={surveyState.surveyThemeValue}
                            renderInput={(params => <TextField {...params} label={"Выберите муниципалитет"}/>)}
                            options={["№177"]}
                            sx={{width: 250, height: 32}}
                            size={"small"}
                        />
                    </div>

                    <div className={s.blockItem}>
                        <Autocomplete
                            key={"school"}
                            //value={surveyState.surveyThemeValue}
                            renderInput={(params => <TextField {...params} label={"Тема опроса"}/>)}
                            options={["Преподаватели"]}
                            sx={{width: 250, height: 32}}
                            size={"small"}
                            freesolo={true}
                        />
                        <TextField label={"Введите заголовок опроса"}
                                   sx={{width: 250, height: 32}}
                                   size={"small"}
                        />
                    </div>


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

                    <div className={s.marks}>
                        <TextField label={"Введите оценку "}
                                   value={resultState.questionsResults[0]}
                                   onChange={(e) => {
                                       setResultState({
                                           ...resultState,
                                           questionsResults: [ e.target.value,...resultState.questionsResults.slice(1)]
                                       })
                                       setActiveStep(4);
                                       setIsBtnActive(true)
                                   }}
                                   size={"small"}
                                   className={s.textField}
                                   key={0}
                        />
                        {textAreasTemplate}
                        <button className={`${s.addButton} ${isBtnActive && s.addButton_active}`}
                                onClick={handleAddButton} disabled={!isBtnActive}>
                            <PlusIcon isWhite={isBtnActive}/>
                        </button>
                    </div>

                    <Button
                        className={s.publishButton}
                        variant={"contained"}
                        disabled={activeStep !== 4}
                        onClick={handleSendBtnClick}
                    >
                        Опубликовать
                    </Button>

                    <Modal
                        open={openModal}
                        close={() => setOpenModal(false)}
                    >
                        <ModalWindow onClick={handleCloseModal} header={"Ваш опрос опубликован!"}
                                     link={"/stakeholder/results"}/>
                    </Modal>

                </div>
            </div>
        </>
    )
}

export default AddUserResult;
