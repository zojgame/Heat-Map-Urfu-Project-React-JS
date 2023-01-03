import './App.css';
import Login from "./pages/Login/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register/Register";
import Survey from "./pages/Survey/Survey";
import Profile from "./pages/Profile";

import CreateNewSurvey from "./pages/StakeholderPages/Surveys/CreateNewSurvey/CreateNewSurvey";
import Surveys from "./pages/StakeholderPages/Surveys/Surveys"
import AddNewMunicipality from "./pages/StakeholderPages/Municipalities/AddNewMunicipality/AddNewMunicipality";


import Heatmap from "./pages/Heatmap/Heatmap";
import SurveyCatalog from "./pages/SurveyCatalog/SurveyCatalog";
import Layout from "./components/Layout/Layout";
import Municipalities from './pages/StakeholderPages/Municipalities/Municipalities';
import Managment from './pages/StakeholderPages/Manage/Managment';
import Results from "./pages/StakeholderPages/Results/Results";
import AddUserResult from "./pages/StakeholderPages/Results/AddUserResult/AddUserResult";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index element={<Heatmap/>}/>
                        <Route path={'login'} element={<Login/>}/>
                        <Route path={'register'} element={<Register/>}/>
                        <Route path={'surveys'} element={<SurveyCatalog/>}/>
                        <Route path={'profile'} element={<Profile />} />
                        <Route path={'surveys/:id'} element={<Survey/>}/>
                        <Route path={'stakeholder/surveys/new'} element={<CreateNewSurvey />} />
                        <Route path={'stakeholder/surveys'} element={<Surveys />} />
                        <Route path={'stakeholder/municipalities'} element={<Municipalities />} />
                        <Route path={'stakeholder/municipalities/new'} element={<AddNewMunicipality />} />
                        <Route path={'stakeholder/map'} element={<Heatmap />} />
                        <Route path={'stakeholder/manage'} element={<Managment />} />
                        <Route path={'stakeholder/results'} element={<Results />} />
                        <Route path={'stakeholder/results/new'} element={<AddUserResult />} />
                        <Route path={'*'} element={<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
