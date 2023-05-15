import React from "react";
import { useNavigate } from "react-router-dom";
import {BiLogOut} from "react-icons/bi"
import "./styles.css"

function GoBack(props){

    const navigate = useNavigate()

    function goBack(){
        sessionStorage.clear()
        props.setRole("")
        props.setTable("Time Table")
        props.setInLogIn(false)
        navigate("/")
    }

    return(
        <div className="go-back-container" onClick={goBack}>
                <BiLogOut className="goback-icon" />
        </div>
    )
}


export default GoBack ;