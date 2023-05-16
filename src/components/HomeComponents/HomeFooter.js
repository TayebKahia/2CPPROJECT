import React from "react";
import {BsFacebook,BsLinkedin} from "react-icons/bs";
import "../../pages/Home/styles.css"
import FooterCard from "../FooterCard";

function HomeFooter (){
    return(
        <footer className="footer-wave home-footer" id="contact">
                

                <div className="cards">
                    <FooterCard />
                    <FooterCard />
                </div>

                <div className="rights">
                    <pre>© HIGHER SCHOOL IN COMPUTER SIDI BEL ABBES 2022</pre>
                    <div className="home-social-media">
                        <a href="https://www.facebook.com/esisba.edu/" target="_blank"><BsFacebook className="home-icon"/></a>
                        <a href="https://dz.linkedin.com/school/ecole-superieure-en-informatique-08-mai-1945-sidi-bel-abbes/?trk=public_profile_topcard-school" target="_blank"><BsLinkedin className="home-icon" /></a>
                    </div>
                </div>
        </footer>
    )
}

export default HomeFooter