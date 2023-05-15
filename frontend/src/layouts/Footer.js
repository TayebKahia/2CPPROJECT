import React from "react";
import {BsFacebook,BsLinkedin} from "react-icons/bs";


function Footer (){
    return(
        <footer>
                <pre>© HIGHER SCHOOL IN COMPUTER SIDI BEL ABBES 2022</pre>
                <div className="social-media">
                    <a href="https://www.facebook.com/esisba.edu/" target="_blank"><BsFacebook className="icon"/></a>
                    <a href="https://dz.linkedin.com/school/ecole-superieure-en-informatique-08-mai-1945-sidi-bel-abbes/?trk=public_profile_topcard-school" target="_blank"><BsLinkedin className="icon" /></a>
                </div>
            </footer>
    )
}

export default Footer