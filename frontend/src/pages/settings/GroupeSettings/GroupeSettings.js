import React, { useEffect } from "react";
import "../styles.css"
import "./styles.css"
import { server } from "../../../data/server";
import axios from "axios";

function GroupeSettings (props){


    const [modules,setModule] = React.useState(props.groupData) 
    const [selectedModule,setSelectedModule] = React.useState("")
    const [chapters,setChapters] = React.useState([])
    const [subChapters,setSubChapters] = React.useState([])




    // useEffect(()=>{
        

    //     axios.get(`${server}/chapters`,{
    //         headers:{
    //             "ngrok-skip-browser-warning":"any"},
    //         params:{
    //             IDEns:props.profID
    //         }
    //     })
    //     .then(res=>{
            
    //         // setChapters(res.data.chapters)
    //         // setSubChapters(res.data.subChapters)
    //     })
    //     .catch(err=>console.log(err))


    // },[])

    console.log(modules)
    const moduleElements = modules.map(data=>{
        return <option value={`${data.CodeMod}`} >{data.CodeMod}</option>
    })

    const chaptersElements = chapters.map(chapter=>{
        return(
            <option value={`${chapter}`}>{chapter}</option>
        )
    })


    const subChaptersElements = subChapters.map(subChapter=>{
        return(
            <option value={`${subChapter}`}>{subChapter}</option>
        )
    })


    function handleModules(){

    }
    function handleChapters(){

    }

    function handleSubChapters(){

    }


    return(
        <form className="lft-mrg group-settings-container">
            <select className="group-select modules" onChange={handleModules}>
                {moduleElements}
            </select>
            <select className="group-select chapters" onChange={handleChapters}>
                {chaptersElements}
            </select>
            <select className="group-select subChapters" onChange={handleSubChapters}>
                {subChaptersElements}
            </select>
        </form>
    )
}

export default GroupeSettings