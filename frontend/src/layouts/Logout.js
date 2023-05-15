import { Link, useNavigate } from "react-router-dom";
import {MdManageAccounts} from "react-icons/md";



function Logout(props){
    

    const navigate = useNavigate()

    function handleLogOut(){
        sessionStorage.clear()
        props.setInLogIn(false)
        props.setRole("")
        props.setTable("Time Table")
        navigate("/")
    }
    
    return(
            <div onClick={handleLogOut} className="logout">
                <span>Logout</span>
            </div>
    )
}

export default Logout;