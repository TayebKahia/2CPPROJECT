import React from "react";
import logo from "../assets/imgs/esi-logo-removebg-preview.png"
import "./styles.css"
import { Outlet } from "react-router-dom";
import GoBack from "./GoBack";
import { useNavigate } from "react-router-dom";
import MgAccount from "../components/MgAccount";


function Navbar(props){
    

    const navigate = useNavigate()

    function setTimeTable(){
        props.setTable("Time Table")
        sessionStorage.setItem("table","Time Table")
    }
    function setGroupTable(){
        props.setTable("Group Table")
        sessionStorage.setItem("table","Group Table")
    }
    function setRoomTable(){
        props.setTable("Room Table")
        sessionStorage.setItem("table","Room Table")
    }

    function handleClick(){
        props.setInLogIn(true)
        navigate("/login")
    }

    function scrollToID(){
        var access = document.getElementById("home")
        window.scrollTo({
            top:access.scrollTop,
            left:access.scrollLeft
        })
    }


    let homeRoleBased = !props.inLogIn && props.role === "" ?
        <>
        <ul className="home-list">
            <a  onClick={scrollToID}><li>Home</li></a>
            <a href="#about"><li>About</li></a>
            <a href="#contact"><li>Contact</li></a>
        </ul>
        <div className="out-text circle" onClick={handleClick}>Login</div>
        </> 
        : null
    


    let basedTable =  props.role !== "" ?
        <div className="tables">
            <ul>
                <a><li onClick={setTimeTable}>Time Table</li></a>
                <a><li onClick={setRoomTable}>Room Table</li> </a>   
                <a><li onClick={setGroupTable}>Group Table</li></a>
            </ul>
        </div> 
        : null


                
    let roleBasedMgAccount = (props.role === "admin" || props.role === "teacher") ?
        <MgAccount 
            role={props.role} 
            setRole={props.setRole} 
            setTable={props.setTable} 
            setInLogIn={props.setInLogIn} 
            />
        : props.role === "student" ? 
            <GoBack 
                setRole={props.setRole} 
                setTable={props.setTable} 
                setInLogIn={props.setInLogIn} 
                />
                :null

    
    return(
        <>
            <nav>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h1>ESI SBA</h1>
                </div>
                {homeRoleBased}
                {basedTable}
                {roleBasedMgAccount}
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;