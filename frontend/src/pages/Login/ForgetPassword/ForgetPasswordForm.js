/* eslint-disable no-undef */
import "./ForgetPasswordForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [emailError, setEmailError] = React.useState();
  const navigate = useNavigate();

  function handleChange(event) {
    setEmail(event.target.value);
    validateField(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (emailIsValid) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      
      fetch("http://127.0.0.1:8000/forgot-password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, OTP: OTP }),
      })
        .then((res) => res.json())
        .then((data) => {
          
          if (data.success) {
            sessionStorage.setItem("OTP", OTP);
            sessionStorage.setItem("IDEns",data.IDEns);
            navigate("/OTPage");
          }
        })
        .catch((err) =>
          console.log(console.log(email + " " + OTP + "not  send"))
        );
    }
  }

  const validateField = (email) => {
    const formula = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formula.test(email) || email === "") {
      setEmailIsValid(true);
      setEmailError("");
    } else {
      setEmailIsValid(false);
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <form class="form" onSubmit={handleSubmit}>
      <p class="form-title">Forgot password</p>
      <div class="input-container">
        <input
          placeholder="Enter email"
          onChange={handleChange}
          required
        ></input>

        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </span>
      </div>

      {!emailIsValid && <div className="error">{emailError}</div>}
      <button class="submit" type="submit">
        reset password
      </button>
    </form>
  );
};

export default ForgetPasswordForm;
