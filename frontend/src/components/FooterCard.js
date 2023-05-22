import React from "react";

function FooterCard(props){
    return(
        <div className="footer-card-container">
            
            <div className="card-icon">
                <img src={props.img} alt="" />
            </div>

            <div className="footer-link">
                <span>{props.text}</span>
            </div>

        </div>
    )
}

export default FooterCard;