import React from "react";
import { MdManageAccounts } from "react-icons/md";
import Permission from "./Permission";
import Logout from "../layouts/Logout";
import "./styles.css"
import { useNavigate } from "react-router-dom";
function MgAccount (props){

    const navigate = useNavigate()

    function handleClick(){
        navigate("/settings")
    }

    return(
        <div className="mg-account">
            <MdManageAccounts className="hvr-drop icon" />
            <div className="dropdown">    
                <Permission onClick={handleClick} text={"Settings"} className="item"/>
                <Logout setInLogIn={props.setInLogIn} role={props.role} setRole={props.setRole} setTable={props.setTable} className="item" />
            </div>
        </div>
    )
}

export default MgAccount