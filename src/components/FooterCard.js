import React from "react";
import feedback from "../assets/imgs/feedback.png"

function FooterCard(){
    return(
        <div className="footer-card-container">
            <div className="card-icon">
                <img src={feedback} alt="" />
            </div>

            <div className="footer-link">
                <span>Give us your feedback !</span>
            </div>
        </div>
    )
}

export default FooterCard;