import React from "react";
import "./styles.css"
import { useNavigate, Link } from "react-router-dom";
import HomeContent from "../../components/HomeComponents/HomeContent";
import HomeFooter from "../../components/HomeComponents/HomeFooter";
import HomeHeader from "../../components/HomeComponents/HomeHeader";


function Home(){
    return(
        <div className="home-container" >
            <HomeHeader />
            <HomeContent />
            <HomeFooter />
        </div>        
    )
}

export default Home ;