import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css"
import {CgProfile} from "react-icons/cg"
import {MdAccessTimeFilled,MdGroup,MdMeetingRoom} from "react-icons/md"
import RoomStgs from "./RoomSettings/RoomStgs";
<<<<<<< Updated upstream

=======
import TableSettings from "./RoomSettings/TableSettings";
import { server } from "../../data/server";
import GroupeSettings from "./GroupeSettings/GroupeSettings";
import GroupTable from "../Tables/GroupTable/GroupTable";

import Groups from "../Tables/Groups";
import {RiLogoutBoxFill} from "react-icons/ri"
import {RiArrowGoBackFill} from "react-icons/ri"
import UsersPage from "../../pages/settings/UsersSettings/UsersPage";
import axios from "axios";
import GrpSettTable from "./GroupeSettings/GrpSettTable";
>>>>>>> Stashed changes



function Settings(props){
<<<<<<< Updated upstream


=======
    
    
    const [selectedYear,setSelectedYear]= React.useState("1CP")
    const [selectedDay,setSelectedDay]= React.useState("DIM")
    const [selectedTable ,setSelectedTable] = React.useState("time")
    const [settingsData,setSettingsData]= React.useState([])
    const [chaptersData,setChaptersData] = React.useState([])
    const [selectedInfo,setSelectedInfo]=React.useState({
        day:"DIM",
        year:'1CP',
        group:'G1',
        hour:'08-10',
        type:'Cour',
        salle:'',
        module:'',
        teacher:'',
        IDSeance:null,
        
    })

    const handleRowClick = (row) => {
        console.log(row.original);
        
    }
    
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
            <GroupeSettings groupData={chaptersData} profID={props.profID} />
            :null
            
            
            let roombtns = selectedTable ==="time"? 
                    <>
                        <select value={selectedDay} className="selection day" id="selected-day"  onChange={handleSelectedDay}>
                            <option value="DIM">DIM</option>
                            <option value="LUN">LUN</option>
                            <option value="MAR">MAR</option>
                            <option value="MER">MER</option>
                            <option value="JEU">JEU</option>
                        </select>
                        <select value={selectedYear} className="selection year" id="year" onChange={handleSelectedYear}>
                            <option value="1CP">1CP</option>
                            <option value="2CP">2CP</option>
                            <option value="1CS">1CS</option>
                            <option value="2CS">2CS</option>
                            <option value="3CS">3CS</option>
                        </select>
                    </>
                :null
                
            
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
            // <GroupTable className={"settings-case"} onRowClick={handleRowClick} />
            <GrpSettTable groupData={chaptersData} setGroupData={setChaptersData} profID={props.profID}/>
            :<UsersPage />







    function handleSelectedDay(e){
        setSelectedDay(e.target.value)
        console.log(document.getElementById("selected-day").value)
        // fetch(`${server}/settingsTable`,{
        //     method:"POST",
        //     headers:{"Accept": "application/json","Content-type": "application/json"},
        //     body:JSON.stringify({year:selectedYear,day:selectedDay})})
        //     .then(res=>res.json())
        //     .then(data=>{setSettingsData(data)})
        //     .catch(err=>console.log(err))

            axios.get(`${server}/settingsTable`,{
                headers:{
                    "ngrok-skip-browser-warning":"any"},
                params:{
                    year:selectedYear,
                    day:e.target.value
                }
            })
            .then(res=>{
                setSettingsData(res.data)
            })
            .catch(err=>console.log(err))  
    }


    function handleSelectedYear(e){
        setSelectedYear(e.target.value)
        // fetch(`${server}/settingsTable`,{
        //     method:"POST",
        //     headers:{"Accept": "application/json","Content-type": "application/json"},
        //     body:JSON.stringify({year:selectedYear,day:selectedDay})})
        //     .then(res=>res.json())
        //     .then(data=>{setSettingsData(data)})
        //     .catch(err=>console.log(err))
            
            axios.get(`${server}/settingsTable`,{
                headers:{
                    "ngrok-skip-browser-warning":"any"},
                params:{
                    year:e.target.value,
                    day:selectedDay
                }
            })
            .then(res=>{
                
                console.log(res)
                setSettingsData(res.data)
            })
            .catch(err=>console.log(err))    
    }
>>>>>>> Stashed changes


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
<<<<<<< Updated upstream
=======
            
>>>>>>> Stashed changes
            <div className="side-bar">
                <CgProfile className="settings-icon"/>
                {/* <MgAccount role={props.role} setRole={props.setRole} setTable={props.setTable}  /> */}
                <ul className="settings-list">
                    <li><MdAccessTimeFilled className="list-icon" /> Time table</li>
                    <li><MdMeetingRoom className="list-icon" />Rooms</li>
                    <li><MdGroup className="list-icon" />Groups</li>
                </ul>
<<<<<<< Updated upstream
                <div className="btns">
                    <div onClick={handleGoBack} className="stg circle out-text">Go Back</div>
                    <div onClick={handleLogOut} className="stg circle out-text">Log Out</div>    
                </div>
            </div>
            <RoomStgs />
            
=======
                <div>
                    <div onClick={handleGoBack} className="settings-btn circle"><RiArrowGoBackFill/><span className="side-bar-text">Goback</span></div>
                    <div onClick={handleLogOut} className="settings-btn settings-logout circle"><RiLogoutBoxFill/><span className="side-bar-text">LogOut</span></div>    
                </div>
            </div>


            {tableBasedSettings}
            <div>
                <div className="sett">
                    {roombtns}
                    
                </div>
                {basedTable}
            </div>
>>>>>>> Stashed changes
        </div>
    )
}

export default Settings