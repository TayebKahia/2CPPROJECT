import React, { useEffect } from "react";
import "../styles.css"
import "./styles.css"
import { server } from "../../../data/server";

function GroupeSettings (){

    const [chapters,setChapters] = React.useState([])
    const [subChapters,setSubChapters] = React.useState([])



    useEffect(()=>{
        fetch(`${server}/`)
        .then(res=>res.json())
        .then(data=>{
            setChapters(data.chapters)
            setSubChapters(data.subChapters)
        })
        .catch(err=>console.log(err))
    },[])

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


    function handleChapters(){

    }

    function handleSubChapters(){

    }


    return(
        <form className="lft-mrg group-settings-container">
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