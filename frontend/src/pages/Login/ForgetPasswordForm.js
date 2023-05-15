import "./ForgetPasswordForm.css";
import React, { useState } from "react";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [emailError, setEmailError] = React.useState();

  function handleChange(event) {
    setEmail(event.target.value);
    validateField(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (emailIsValid) {
      fetch("http://127.0.0.1:8000/forgot-password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email })})
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message);
          })
          .catch((err) => console.log(email + "not sent"))
      }
    
  }
  

  const validateField = (email) => {
    const formula = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formula.test(email) || email === "") {
      setEmailIsValid(true);
      setEmailError("  ");
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
