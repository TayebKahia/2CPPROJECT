import React, { useEffect, useState } from "react";
import { GroupColumns } from "../../data/GroupColumns";
import { useTable } from "react-table";
import "./tableStyles.css";
import "./styles.css"
import GroupData from "../../data/GroupData.json"
import GroupTableSettings from "./GroupTable/GroupTableSettings";
import GroupTable from "./GroupTable/GroupTable";
import axios from "axios";
import { server } from "../../data/server";




function Groups(props){
    
    const [GroupsData,setGroupsData] = useState([])
    const [groups,setGroups] = React.useState([])
    const [selectedCycle,setSelectedCycle] = useState("1CP")
    const [selectedGroup,setSelectedGroup] = useState("G01")
    
    
    const columns = React.useMemo(()=> GroupColumns )
    const data = React.useMemo(()=>GroupData , [GroupData])
    
    
    const groupElements = groups.map(group=>{
        return <option key={group} value={group}>{group}</option>
    })
    


    useEffect(()=>{
        axios.get(`${server}/tableGroupe`,{
            headers:{
                "ngrok-skip-browser-warning":"any"},
            params:{
                cycle:selectedCycle
            }
        })
        .then( res=> {
            setGroups(res.data)
        })
        .catch(err=>console.log(err))

        
    },[])

            async function handleCycle(e){
                setSelectedCycle(e.target.value)
                await axios.get(`${server}/tableGroupe`,{
                    headers:{
                        "ngrok-skip-browser-warning":"any"},
                    params:{
                        cycle:e.target.value
                    }
                })
                .then(res=> {
                    console.log(res.data)
                    setGroups(res.data)})
                .catch(err=>console.log(err))


                axios.get(`${server}/tableGroupe`,{
                    headers:{
                        "ngrok-skip-browser-warning":"any"},
                    params:{
                        cycle:e.target.value,
                        group:selectedGroup
                    }
                })
                .then( res=>{
                    console.log(res.data)
                    setGroupsData(res.data)} )
                .catch(err=>console.log(err))
                
            }
            


            function handleGroup(e){
                setSelectedGroup( e.target.value)
                axios.get(`${server}/tableGroupe`,{
                    headers:{
                        "ngrok-skip-browser-warning":"any"},
                    params:{
                        cycle:selectedCycle,
                        group:e.target.value
                    }
                })
                .then( res=>{
                    setGroupsData(res.data)
                    console.log(res.data)
                } )
                .catch(err=>console.log(err))
            }

        
    return(
        <div className={`group-table-container ${props.className}`}>
            <div className="options">
                <select value={selectedCycle}  id="cycle-dropdown" onChange={handleCycle}>
                    <option value="1CP">1CP</option>
                    <option value="2CP">2CP</option>
                    <option value="1CS">1CS</option>
                    <option value="2CS">2CS</option>
                    <option value="3CS">3CS</option>
                    
                </select>
                <select value={selectedGroup} id="groups-dropdown" onChange={handleGroup}>
                    {groupElements}
                </select>
            </div>

            <GroupTable 
                GroupData={GroupsData} 
                setGroupData={setGroupsData}
                groups={groups}
                setGroups={setGroups}
                selectedCycle={selectedCycle}
                setSelectedCycle={setSelectedCycle}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                onRowClick={props.onRowClick}
                profID={props.profID}
                /> 
        </div>
    )
}

export default Groups ;