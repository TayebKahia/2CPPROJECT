import "./App.css";
import React from "react";
import Navbar from "./layouts/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import Tables from "./pages/Tables/Tables";
import ForgetPasswordPage  from "./pages/Login/ForgetPassword/ForgetPasswordPage.js";
import Settings from "./pages/settings/Settings";
import ConfirmPasswordPage from "./pages/Login/ForgetPassword/ConfirmPasswordPage";
import OTPage from "./pages/Login/ForgetPassword/OTPage";
function App() {
  const [role, setRole] = React.useState(sessionStorage.getItem("role") || "");
  console.log("hello mother fucker?");
  const [table, setTable] = React.useState(
    sessionStorage.getItem("table") || "Time Table"
  );

  const [inLogIn, setInLogIn] = React.useState(false);

  const [dates, setDates] = React.useState([]);

  React.useEffect(() => {
    let temp = [];
    var curr = new Date("2023-5-10"); // get current date
    var first = curr.getDate(); //to set first day on monday, not on sunday, first+1 :
    for (var i = 0; i < 7; i++) {
      var next = first + i;
      var nextDay = new Date(curr.setDate(next)).getDate().toString();
      var nextMonth = (new Date(curr.setDate(next)).getMonth() + 1).toString();
      var nextYear = new Date(curr.setDate(next)).getFullYear().toString();
      // setDates(prevDates => [...prevDates,nextYear+"/"+nextMonth+"/"+nextDay])
      temp.push(nextYear + "/" + nextMonth + "/" + nextDay);
    }
    setDates(temp);
  }, [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()]);

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
                <LoginPage role={role} setRole={setRole} setTable={setTable} />
              }
            />
            <Route
              path="/tables"
              element={<Tables table={table} setTable={setTable} role={role} />}
            />
            <Route path="/ForgetPassword" element={<ForgetPasswordPage />} />
            <Route path="/OTPage" element={<OTPage />} />
            <Route path="/ConfirmPassword" element={<ConfirmPasswordPage />} />
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
