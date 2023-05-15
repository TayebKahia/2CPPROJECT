import React from "react";
import image from "../../assets/imgs/illustration.png"


function HomeHeader(){
    return(
        <div className="wave" id="home">
                <div className="wave-text">
                    <span>Lorem ipsum <span className="blue">dolor</span> sit amet, consectetur  adipiscing <span className="blue">elit</span>, sed do <span className="blue">eiusmod</span> tempor incididunt ut labore et dolore magna <span className="blue">aliqua.</span></span>
                </div>
                <img src={image} alt="illustration" />
            </div>
    )
}

export default HomeHeader