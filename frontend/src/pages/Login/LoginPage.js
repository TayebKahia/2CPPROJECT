import React from "react";
import Login from "./Login";
import Footer from "../../layouts/Footer";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const navigate = useNavigate();
  function AsStudent() {
    props.setRole("student");
    sessionStorage.setItem("role", "student");
    navigate("/tables");
  }

  return (
    <div className="login-page">
      <main>
        <div className="esi-key">
          <h2>
            {" "}
            <span className="grey">ESI SBA</span>{" "}
            <span className="LColor">ACCOUNT</span>
          </h2>
          <h2 className="sign-in">Sign In</h2>
        </div>
        <div className="login-part">
          <Login
            role={props.role}
            setRole={props.setRole}
            setTable={props.setTable}
          />
          <div className="line"></div>
          <span
            className="login-text forget-password"
            onClick={() => {
              navigate("/ForgetPassword");
            }}
          >
            FORGET YOUR PASSWORD ?
          </span>
          <span className="login-text enter-as-student" onClick={AsStudent}>
            ENTER AS A STUDENT ?
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
