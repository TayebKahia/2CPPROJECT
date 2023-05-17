/* eslint-disable no-undef */
import "./ConfirmPasswordForm.css";
import React, { useState } from "react";

const ConfirmPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }
  function handleChangePasswordConfirm(event) {
    setPasswordConfirm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (password === passwordConfirm) {
      fetch("http://127.0.0.1:8000/forgot-password", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            navigate("/login");
            console.log(password + " sent");
          }
        })
        .catch((err) => console.log(password + " failed"));
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="form-title">Reset password</p>
      <div className="input-container">
        <input
          placeholder="Enter password"
          onChange={handleChangePassword}
          required
        ></input>
      </div>
      <div class="input-container">
        <input
          placeholder="Confirm password"
          onChange={handleChangePasswordConfirm}
          required
        ></input>
      </div>
      {!(password === passwordConfirm) ? (
        <div className="error">
          please ensure that both passwords are the same and try again
        </div>
      ) : (
        <div className="error"></div>
      )}
      <button className="submit" type="submit">
        reset password
      </button>
    </form>
  );
};

export default ConfirmPasswordForm;
