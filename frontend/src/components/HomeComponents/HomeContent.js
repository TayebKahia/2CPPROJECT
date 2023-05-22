import React from "react";
import TableDescription from "../TableDescription";
// import firstImg from "../assets/imgs/illustration.png"
// import secondImg from "../assets/imgs/illustration.png"
// import thirdImg from "../assets/imgs/illustration.png"
import roomTableImg from "../../assets/imgs/room-table .png"
import timeTableImg from "../../assets/imgs/time-table.png"
import thirdImg from "../../assets/imgs/illustration.png"


function HomeContent (){
    return(
        <div className="home-content-container" id="about">
            <TableDescription flexDirection="row" img={roomTableImg} />
            <TableDescription flexDirection="row-reverse" img={timeTableImg} />
            <TableDescription flexDirection="row" img={thirdImg} />
            <TableDescription flexDirection="row-reverse" img={timeTableImg} />
            <TableDescription flexDirection="row" img={thirdImg} />
        </div>
    )
}

export default HomeContent