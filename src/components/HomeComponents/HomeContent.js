import React from "react";
import TableDescription from "../TableDescription";
// import firstImg from "../assets/imgs/illustration.png"
// import secondImg from "../assets/imgs/illustration.png"
// import thirdImg from "../assets/imgs/illustration.png"
import firstImg from "../../assets/imgs/illustration.png"
import secondImg from "../../assets/imgs/illustration.png"
import thirdImg from "../../assets/imgs/illustration.png"


function HomeContent (){
    return(
        <div className="home-content-container" id="about">
            <TableDescription flexDirection="row" img={firstImg} />
            <TableDescription flexDirection="row-reverse" img={secondImg} />
            <TableDescription flexDirection="row" img={thirdImg} />
        </div>
    )
}

export default HomeContent