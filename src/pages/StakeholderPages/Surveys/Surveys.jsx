import {useState} from "react";
import { Link } from "react-router-dom";

import FilterButton from "../../../components/SurveyCatalog/FilterButton";
import SurveyItem from "../../../components/SurveyCatalog/SurveyItem";
import {Button, IconButton, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import s from "./Surveys.module.scss";

const array = [
    {
        id: 0,
        theme: 'качество дз',
        text: 'оцените качество дз',
        count: 12
    },
    {
        id: 12334,
        theme: 'качест54во дз',
        text: 'оцените 45качество дз',
        count: 12
    },
    {
        id: 123344,
        theme: 'качеств3о дз',
        text: 'оцените3 качество дз',
        count: 12
    },
    {
        id: 123224,
        theme: 'качество1 дз',
        text: 'оцените к1ачество дз',
        count: 12
    },

]

function Surveys() {
    const [filters, setFilters] = useState({
        region: '',
        city: '',
        school: '',

    });

    const filtersOnChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value})
    }

    const handleAddButton = (e) => {

    }

    return (
        <div className={s.survey_catalog_container}>
            <div className={s.page_title}>
                <h1>Здесь находятся все созданные вами опросы</h1>

                <Link to={'new'} style={{ textDecoration: 'none' }} >
                    <Button
                        className={s.buttonAdd}
                        variant={'outlined'}
                        onClick={handleAddButton}
                    >
                        <AddIcon style={{fontSize: "20px", marginRight: "5px"}}/>
                        Добавить опрос
                    </Button>
                </Link>
            </div>
            <div className={s.survey_filters}>


                <TextField
                    className={s.search_form}
                    onChange={filtersOnChange}
                    id="searchFilter"
                    size='small'
                    name='searchFilter'
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            paddingRight: 0,
                        },
                        '& .MuiIconButton-root': {
                            color: 'white',
                            borderTopRightRadius: '5px',
                            borderBottomRightRadius: '5px'
                        },
                    }
                    }
                    label="Введите тему вопроса"
                    InputProps={{
                        endAdornment: (
                            <IconButton sx={{background: '#1890FF', borderRadius: 0,}}>
                                <SearchIcon/>
                            </IconButton>
                        ),
                    }}
                />
                <FilterButton
                    text={'Преподавание'}
                />
                <FilterButton
                    text={'Бытовые'}
                />
                <FilterButton
                    text={'Социальные'}
                />

            </div>
            <div className={s.survey_catalog}>
                <div className={s.survey_catalog_list}>
                    <h2 className={s.survey_for}>Для родителей:</h2>
                    <div className={s.surveys}>
                        {
                            array.map(elem => {
                                return (
                                    <SurveyItem id={elem.id} theme={elem.theme} text={elem.text} count={elem.count}/>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Surveys;
