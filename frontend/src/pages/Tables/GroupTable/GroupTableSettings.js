import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../data/server";
import "../styles.css"

function GroupTableSettings (props){

    // const [selectedCycle,setSelectedCycle] = useState("1CP")
    // const [selectedGroup,setSelectedGroup] = useState("G01")
    // const [groups,setGroups] = React.useState([])
    const groupElements = props.groups.map(group=>{
        return <option key={group} value={group}>{group}</option>
    })
    


    useEffect(()=>{
        axios.get(`${server}/tableGroupe`,{
            headers:{
                "ngrok-skip-browser-warning":"any"},
            params:{
                cycle:props.selectedCycle
            }
        })
        .then( res=> {
            props.setGroups(res.data)
        })
        .catch(err=>console.log(err))

        
    },[])

            async function handleCycle(e){
                props.setSelectedCycle(e.target.value)
                await axios.get(`${server}/tableGroupe`,{
                    headers:{
                        "ngrok-skip-browser-warning":"any"},
                    params:{
                        cycle:e.target.value
                    }
                })
                .then(res=> props.setGroups(res.data))
                .catch(err=>console.log(err))


                axios.get(`${server}/tableGroupe`,{
                    headers:{
                        "ngrok-skip-browser-warning":"any"},
                    params:{
                        cycle:e.target.value,
                        group:props.selectedGroup
                    }
                })
                .then( res=>props.setGroupData(res.data) )
                .catch(err=>console.log(err))
                
            }


            function handleGroup(e){
                props.setSelectedGroup( e.target.value)
                axios.get(`${server}/tableGroupe`,{
                    headers:{
                        "ngrok-skip-browser-warning":"any"},
                    params:{
                        cycle:props.selectedCycle,
                        group:e.target.value
                    }
                })
                .then( res=>{
                    props.setGroupData(res.data)
                    console.log(res.data)
                } )
                .catch(err=>console.log(err))
            }


    return(
        <>
            <div className="options">
                <select value={props.selectedCycle}  id="cycle-dropdown" onChange={handleCycle}>
                    <option value="1CP">1CP</option>
                    <option value="2CP">2CP</option>
                    <option value="1CS">1CS</option>
                    <option value="2CS">2CS</option>
                    <option value="3CS">3CS</option>
                    
                </select>
                <select value={props.selectedGroup} id="groups-dropdown" onChange={handleGroup}>
                    {groupElements}
                </select>
            </div>
        </>
    )
}


export default GroupTableSettings;