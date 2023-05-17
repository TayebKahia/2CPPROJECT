import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css"
import {CgProfile} from "react-icons/cg"
import {MdAccessTimeFilled,MdGroup,MdMeetingRoom} from "react-icons/md"
import RoomStgs from "./RoomSettings/RoomStgs";
import RoomTable from "../Tables/RoomTable";
import TableSettings from "./RoomSettings/TableSettings";


function Settings(props){
    const [selectedYear,setSelectedYear]= React.useState("1CP")

    const [selectedInfo,setSelectedInfo]=React.useState({
        day:"sunday",
        year:'1CP',
        group:'G1',
        hour:'08-10',
        type:'Cour',
        salle:'',
        module:'',
        teacher:'',
        IDSeance:null

    })

   

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
            <RoomStgs selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedInfo={selectedInfo} setSelectedInfo={setSelectedInfo} dates={props.dates} setDates={props.setDates} />
            <TableSettings selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedInfo={selectedInfo} setSelectedInfo={setSelectedInfo} role={props.role} />
        </div>
    )
}

export default Settings