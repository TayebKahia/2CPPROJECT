import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css"
import {CgProfile} from "react-icons/cg"
import {MdAccessTimeFilled,MdGroup,MdMeetingRoom} from "react-icons/md"
import RoomStgs from "./RoomSettings/RoomStgs";




function Settings(props){




    const navigate = useNavigate()
    function handleLogOut(){
        sessionStorage.clear()
        props.setInLogIn(false)
        props.setRole("")
        props.setTable("Time Table")
        navigate("/")
    }

    function handleGoBack(){
        navigate("/tables")
    }

    return(
        <div className="settings-container">
            <div className="side-bar">
                <CgProfile className="settings-icon"/>
                {/* <MgAccount role={props.role} setRole={props.setRole} setTable={props.setTable}  /> */}
                <ul className="settings-list">
                    <li><MdAccessTimeFilled className="list-icon" /> Time table</li>
                    <li><MdMeetingRoom className="list-icon" />Rooms</li>
                    <li><MdGroup className="list-icon" />Groups</li>
                </ul>
                <div className="btns">
                    <div onClick={handleGoBack} className="stg circle out-text">Go Back</div>
                    <div onClick={handleLogOut} className="stg circle out-text">Log Out</div>    
                </div>
            </div>
            <RoomStgs />
            
        </div>
    )
}

export default Settings