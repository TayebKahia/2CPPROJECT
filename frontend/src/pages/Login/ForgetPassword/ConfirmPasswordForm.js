/* eslint-disable no-undef */
import "./ConfirmPasswordForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react-hooks/rules-of-hooks
const navigate=useNavigate();
function ConfirmPasswordForm() {
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
      const IDEns = sessionStorage.getItem("IDEns");
      fetch("http://127.0.0.1:8000/forgot-password", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ password: password, IDEns: IDEns }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
          console.log(data);
            console.log(password + " sent");
            sessionStorage.clear();
            navigate("/login");
          }
        })
        .catch((err) => console.log(password + " failed"));
    }
  }

  return (
    <form class="form" onSubmit={handleSubmit}>
      <p class="form-title">Reset password</p>
      <div class="input-container">
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
      <button class="submit" type="submit">
        reset password
      </button>
    </form>
  );
}

export default ConfirmPasswordForm;
