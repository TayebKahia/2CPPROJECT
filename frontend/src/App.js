import "./App.css";
import React from "react";
import Navbar from "./layouts/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import Tables from "./pages/Tables/Tables";
import Settings from "./pages/settings/Settings";
import ForgetPasswordPage from "./pages/Login/ForgetPassword/ForgetPasswordPage.js";
import ConfirmPasswordPage from "./pages/Login/ForgetPassword/ConfirmPasswordPage";
import OTPage from "./pages/Login/ForgetPassword/OTPage";
import { UsersPage } from "./pages/settings/UsersSettings/UsersPage";

function App() {
  const [role, setRole] = React.useState(sessionStorage.getItem("role") || "");

  const [table, setTable] = React.useState(
    sessionStorage.getItem("table") || "Time Table"
  );

  const [inLogIn, setInLogIn] = React.useState(false);

  const [dates, setDates] = React.useState([]);

  const [IDTeacher, setIDTeacher] = React.useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
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
                <LoginPage
                  role={role}
                  setRole={setRole}
                  setTable={setTable}
                  IDTeacher={IDTeacher}
                  setIDTeacher={setIDTeacher}
                />
              }
            />
            <Route
              path="/tables"
              element={<Tables table={table} setTable={setTable} role={role} />}
            />
            {/* <Route path="/ForgetPassword" element={<ForgetPasswordPage />} />
            <Route path="/OTPage" element={<OTPage />} />
            <Route path="/ConfirmPassword" element={<ConfirmPasswordPage />} />
            <Route path="/UsersTable" element={<UsersPage />} /> */}
          </Route>
          <Route
            path="/settings"
            element={
              <Settings
                dates={dates}
                setDates={setDates}
                setInLogIn={setInLogIn}
                role={role}
                setRole={setRole}
                setTable={setTable}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
