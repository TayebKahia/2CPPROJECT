import React, { useState } from "react";
import logo from "../assets/imgs/esi-logo-removebg-preview.png"
import "./styles.css"
import Logout from "./Logout";
import { Outlet } from "react-router-dom";
import GoBack from "./GoBack";
import { Link , useNavigate } from "react-router-dom";
import Permission from "../components/Permission";
import MgAccount from "../components/MgAccount";


function Navbar(props){
    // let logoutBoolean = false;

    // if(props.role === "admin" || props.role === "teacher"){
    //     logoutBoolean = true;
    // }
    // const [inLogIn,setInLogIn] = useState(false)

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

    return(
        <>
            <nav>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h1>ESI SBA</h1>
                </div>
                {!props.inLogIn && props.role === "" &&
                <>
                <ul className="home-list">
                    <a  onClick={scrollToID}><li>Home</li></a>
                    <a href="#about"><li>About</li></a>
                    <a href="#contact"><li>Contact</li></a>
                </ul>
                <div className="out-text circle" onClick={handleClick}>Login</div>
                </>
                
                }
                

                


                { props.role !== "" && 
                <div className="tables">
                    <ul>
                        <li onClick={setTimeTable}>Time Table</li>
                        <li onClick={setRoomTable}>Room Table</li>    
                        <li onClick={setGroupTable}>Group Table</li>    
                    </ul>
                </div>}
                
                {(props.role === "admin" || props.role === "teacher") && <MgAccount role={props.role} setRole={props.setRole} setTable={props.setTable} setInLogIn={props.setInLogIn} />}
                {props.role === "student" && <GoBack setRole={props.setRole} setTable={props.setTable} setInLogIn={props.setInLogIn} />}
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;