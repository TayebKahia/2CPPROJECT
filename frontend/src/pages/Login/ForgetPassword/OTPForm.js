import React from "react";
import './OTPForm.css'

function OTPForm() {


  return (
    <form class="form"> 
    <div class="title">OTP</div>
     <div class="title">Verification Code</div>
      <p class="message">We have sent a verification code to your mobile number</p>
       <div class="inputs">
        <input id="input1" type="text" maxlength="1"></input>
        <input id="input2" type="text" maxlength="1"></input>
         <input id="input3" type="text" maxlength="1"></input>
          <input id="input4" type="text" maxlength="1"></input>
           </div> 
           <button class="action">verify me</button> 
           </form>
  );
}
export default OTPForm;