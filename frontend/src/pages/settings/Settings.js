import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"
import {CgProfile} from "react-icons/cg"
import {MdAccessTimeFilled,MdGroup,MdMeetingRoom} from "react-icons/md"
import RoomStgs from "./RoomSettings/RoomStgs";
import TableSettings from "./RoomSettings/TableSettings";
import { server } from "../../data/server";
import GroupeSettings from "./GroupeSettings/GroupeSettings";
import GroupTable from "../Tables/GroupTable";
import {RiLogoutBoxFill} from "react-icons/ri"
import {RiArrowGoBackFill} from "react-icons/ri"
import Notif from "../../components/Notif";



function Settings(props){


    const [selectedYear,setSelectedYear]= React.useState("1CP")
    const [selectedDay,setSelectedDay]= React.useState("DIM")
    const [selectedTable , setSelectedTable] = React.useState("time")
    const [settingsData,setSettingsData]= React.useState([])
    const [selectedInfo,setSelectedInfo]=React.useState({
        day:"DIM",
        year:'1CP',
        group:'G1',
        hour:'08-10',
        type:'Cour',
        salle:'',
        module:'',
        teacher:'',
        IDSeance:null

    })

    const handleRowClick = (row) => {
        console.log('Clicked row data:', row.original);
        
    }

    let basedTable = selectedTable ==="time" ? 
        <TableSettings 
        selectedYear={selectedYear} 
        setSelectedYear={setSelectedYear} 
        selectedInfo={selectedInfo} 
        setSelectedInfo={setSelectedInfo} 
        role={props.role}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        settingsData={settingsData}
        setSettingsData={setSettingsData}
        /> : selectedTable === "groups" ? 
            <GroupTable className={"settings-case"} onRowClick={handleRowClick} />
            :null



        let tableBasedSettings =  selectedTable ==="time" ?   
            <RoomStgs 
                selectedYear={selectedYear} 
                setSelectedYear={setSelectedYear} 
                selectedInfo={selectedInfo} 
                setSelectedInfo={setSelectedInfo} 
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                settingsData={settingsData}
                setSettingsData={setSettingsData}
            />
            : selectedTable ==="groups" ? 
                <GroupeSettings />
                :null


        let roombtns = selectedTable ==="time" ? 
                <>
                    <select value={selectedDay}  className="selection day" onChange={handleDay}  >
                        <option value="DIM">DIMANCHE</option>
                        <option value="LUN">lUNDI</option>
                        <option value="MAR">MARDI</option>
                        <option value="MER">MERCREDI</option>
                        <option value="JEU">JEUDI</option>
                    </select>
                    <select value={selectedYear}  className="selection year" id="year" onChange={handleYear} >
                        <option value="1CP">1CP</option>
                        <option value="2CP">2CP</option>
                        <option value="1CS">1CS</option>
                        <option value="2CS">2CS</option>
                        <option value="3CS">3CS</option>
                    </select>
                </>
            :null
            

            
    function handleDay(e){
        setSelectedDay(e.target.value)
        fetch(`${server}/settingsTable`,{
            method:"POST",
            headers:{"Accept": "application/json","Content-type": "application/json"},
            body:JSON.stringify({year:selectedYear,day:selectedDay})})
            .then(res=>res.json())
            .then(data=>{setSettingsData(data)})
            .catch(err=>console.log(err))
    }


    function handleYear(e){
        setSelectedYear(e.target.value)
        fetch(`${server}/settingsTable`,{
            method:"POST",
            headers:{"Accept": "application/json","Content-type": "application/json"},
            body:JSON.stringify({year:selectedYear,day:selectedDay})})
            .then(res=>res.json())
            .then(data=>{setSettingsData(data)})
            .catch(err=>console.log(err))
    }


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
            <Notif message={"Added"}/>
            <div className="side-bar">
                <CgProfile className="settings-icon"/>
                <ul className="settings-list">
                    <li onClick={()=>{setSelectedTable("time")}}><MdAccessTimeFilled className="list-icon"/><span className="side-bar-text">Time</span></li>
                    <li onClick={()=>{setSelectedTable("groups")}}><MdGroup className="list-icon" /><span className="side-bar-text">Groups</span></li>
                    {props.role === "admin" && <li onClick={()=>setSelectedTable("role")}><MdMeetingRoom className="list-icon" /><span className="side-bar-text">Role</span></li>}
                </ul>
                <div>
                    <div onClick={handleGoBack} className="settings-btn circle"><RiArrowGoBackFill/><span className="side-bar-text">Goback</span></div>
                    <div onClick={handleLogOut} className="settings-btn circle"><RiLogoutBoxFill/><span className="side-bar-text">LogOut</span></div>    
                </div>
            </div>


            {tableBasedSettings}
            <div>
                <div className="sett">
                    {roombtns}
                </div>
                {basedTable}
            </div>
        </div>
    )
}

export default Settings