import React, { useState, useRef } from "react";
import "./OTPForm.css";

function OTPForm() {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputs = useRef([]);

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

  return (
    <form className="form">
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

      <button>
        <span></span>
        <span></span>
        <span></span>
        <span></span> verify me
      </button>
    </form>
  );
}

export default OTPForm;
