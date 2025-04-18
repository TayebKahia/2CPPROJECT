/* eslint-disable no-undef */
import React, { useState, useRef } from "react";
import "./OTPForm.css";
import { useNavigate } from "react-router-dom";
function OTPForm() {
  // const [otp, setOTP] = useState(["", "", "", ""]);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const navigate=useNavigate();
  const handleInputChange = (index, event) => {
    const newOTP = [...otp];
    newOTP[index] = event.target.value;

    setOTP(newOTP);

    if (event.target.value !== "") {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };
  function hadleSubmit() {

    if (sessionStorage.getItem("OTP") === otp.join("")) {
      
      navigate("/ConfirmPassword");
    }
  }

  return (
    <form className="form">
      <div className="title">OTP</div>
      <div className="title">Verification Code</div>
      <p className="message">
        We have sent a verification code to your mobile number
      </p>
      <div className="inputs">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            type="text"
            maxLength="1"
            value={value}
            onChange={(event) => handleInputChange(index, event)}
          />
        ))}
      </div>
      <button className="action" onClick={hadleSubmit}>
        verify me
      </button>
    </form>
  );
}

export default OTPForm;
