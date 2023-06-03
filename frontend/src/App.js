<<<<<<< Updated upstream
import "./App.css";
import ForgetPasswordPage from "./pages/Login/ForgetPasswordPage";
import React from "react";
import Navbar from "./layouts/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import Tables from "./pages/Tables/Tables";
import Settings from "./pages/settings/Settings";
=======
import './App.css';
import React from 'react';
import Navbar from './layouts/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage';
import Tables from './pages/Tables/Tables';
import Settings from './pages/settings/Settings';
import ScrollTop from './components/ScrollTop';

>>>>>>> Stashed changes

function App() {
  const [role, setRole] = React.useState(sessionStorage.getItem("role") || "");

<<<<<<< Updated upstream
  const [table, setTable] = React.useState(
    sessionStorage.getItem("table") || "Time Table"
  );

  const [inLogIn, setInLogIn] = React.useState(false);
=======
    const [role,setRole] = React.useState(sessionStorage.getItem("role") || "")

    const [profID,setProfID] = React.useState(0)

    const [table,setTable] = React.useState(sessionStorage.getItem("table") || "Time Table")

    const [inLogIn,setInLogIn] = React.useState(false)
    
    const [dates,setDates] = React.useState([])

    const [IDTeacher,setIDTeacher] = React.useState(null)

    const [selectedCycle,setSelectedCycle] = React.useState("1CP")
    const [selectedGroup,setSelectedGroup] = React.useState("G1")
>>>>>>> Stashed changes

  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
<<<<<<< Updated upstream
          <Route
            element={
              <Navbar
                inLogIn={inLogIn}
                setInLogIn={setInLogIn}
                role={role}
                setRole={setRole}
                setTable={setTable}
              />
            }
          >
            <Route
              path="/"
              element={<Home table={table} setTable={setTable} />}
            />
            <Route
              path="/login"
              element={
                <LoginPage role={role} setRole={setRole} setTable={setTable} />
              }
            />
            <Route
              path="/tables"
              element={<Tables table={table} setTable={setTable} />}
            />
            <Route path="/ForgetPassword" element={<ForgetPasswordPage />} />
          </Route>
          <Route
            path="/settings"
            element={
              <Settings
                setInLogIn={setInLogIn}
                role={role}
                setRole={setRole}
                setTable={setTable}
              />
            }
          />
=======
          <Route element={<Navbar inLogIn={inLogIn} setInLogIn={setInLogIn} role={role} setRole={setRole} setTable={setTable}  />}>
            <Route path="/" element={<Home table={table} setTable={setTable} />} />
            <Route path="/login" element={<LoginPage profID={profID} setProfID={setProfID} role={role} setRole={setRole} setTable={setTable} IDTeacher={IDTeacher} setIDTeacher={setIDTeacher}  />} />
            <Route path="/tables" element={<Tables table={table} setTable={setTable} role={role} selectedCycle={selectedCycle} setSelectedCycle={setSelectedCycle} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>} />
          </Route>
          <Route path="/settings" element={<Settings profID={profID} dates={dates} setDates={setDates} setInLogIn={setInLogIn} role={role} setRole={setRole} setTable={setTable}/>} />
>>>>>>> Stashed changes
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
