import React, { useEffect } from "react";
import "./styles.css"
import { server } from "../../../data/server";
import Notif from "../../../components/Notif";


function RoomStgs(props){
    


    
        // const [selectedYear,setSelectedYear]= React.useState("1CP")
        const [groups,setGroups] = React.useState([])
        const [modules,setModules] = React.useState([])
        const [hours,setHours] = React.useState([])
        const [rooms,setRooms] =  React.useState([])


        
        
        function handleDay(e){
            
            props.setSelectedInfo(prevInfo => ({...prevInfo,day:e.target.value}))
        }


        function handleYear(e){  
            props.setSelectedInfo(prevInfo => ({...prevInfo,year:e.target.value}))
            fetch(`${server}/settings`,{
                method:"POST",
                headers:{"Accept": "application/json","Content-type": "application/json"},
                body:JSON.stringify({year:props.selectedInfo.year})})
                .then(res=>res.json())
                .then(data=>{
                    setGroups(data.groups)
                    setModules(data.modules)
                    setRooms(data.rooms)
                    setHours(data.hours)
                })
                .catch(err=>console.log(err))
        }


        function handleGroup(e){
            props.setSelectedInfo(prevInfo => ({...prevInfo,group:e.target.value}))
        }
        function handleType(e){
            props.setSelectedInfo(prevInfo => ({...prevInfo,type:e.target.value}))
        }


        function handleSalle(e){
            props.setSelectedInfo(prevInfo => ({...prevInfo,salle:e.target.value}))
        }


        function handleModule(e){
            props.setSelectedInfo(prevInfo => ({...prevInfo,module:e.target.value}))
        }

        function handleHour(e){
            props.setSelectedInfo(prevInfo => ({...prevInfo,hour:e.target.value}))
        }

        useEffect(()=>{
            fetch(`${server}/settings`,{
            method:"POST",
            headers:{"Accept": "application/json","Content-type": "application/json"},
            body:JSON.stringify({year:props.selectedInfo.year})})
            .then(res=>res.json())
            .then(data=>{
                setGroups(data.groups)
                setModules(data.modules)
                setRooms(data.rooms)
                setHours(data.hours)
            })
            .catch(err=>console.log(err))
        },[])


        const groupElements = groups.map(group=>{
            return <option key={group} value={group}>{group}</option>
        })

        const moduleElement= modules.map(module=>{
            return <option key={module} value={module}>{module}</option>
        })

        const roomsElement = rooms.map(room=>{
            return <option key={room} value={room}>{room}</option>
        })

        const hoursElement = hours.map(hour=>{
            return <option key={hour} value={hour}>{hour}</option>
        })
    
    

    
        


        function handleUpdate(e){
            e.preventDefault()
            const{day,year,hour,salle,module,teacher,group,type} = props.selectedInfo
            props.setSelectedDay(day)
            props.setSelectedYear(year)
            fetch(`${server}/test`,{
                method:"PUT",
                headers:{"Accept": "application/json","Content-type": "application/json"},
                body:JSON.stringify({infos:props.selectedInfo})})
                .then(response =>response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
                // props.setSelectedInfo(prevSelectedInfo => ({...prevSelectedInfo}))

            fetch(`${server}/settingsTable`,{
                method:"POST",
                headers:{"Accept": "application/json","Content-type": "application/json"},
                body:JSON.stringify({year:props.selectedYear,day:props.selectedDay})})
                .then(res=>res.json())
                .then(data=>{props.setSettingsData(data)})
                .catch(err=>console.log(err))
        }

        function handleRemove(e){
            e.preventDefault()
            fetch(`${server}/settingsTable`,{
                method:"DELETE",
                headers:{"Accept": "application/json","Content-type": "application/json"},
                body:JSON.stringify({IDSeance:props.selectedInfo.IDSeance})})
                .catch(err=>console.log(err))

            fetch(`${server}/settingsTable`,{
                method:"POST",
                headers:{"Accept": "application/json","Content-type": "application/json"},
                body:JSON.stringify({year:props.selectedYear,day:props.selectedDay})})
                .then(res=>res.json())
                .then(data=>{props.setSettingsData(data)})
                .catch(err=>console.log(err))
        }


        function handleRemoveAll(e){
            e.preventDefault()
            // fetch(`${server}/settingsTable`,{
            //     method:"DELETE",
            //     headers:{"Accept": "application/json","Content-type": "application/json"},
            //     body:JSON.stringify({IDSeance:props.selectedInfo.IDSeance})})
            //     .catch(err=>console.log(err))

            // fetch(`${server}/settingsTable`,{
            //     method:"POST",
            //     headers:{"Accept": "application/json","Content-type": "application/json"},
            //     body:JSON.stringify({year:props.selectedYear,day:props.selectedDay})})
            //     .then(res=>res.json())
            //     .then(data=>{props.setSettingsData(data)})
            //     .catch(err=>console.log(err))
        }
    

        function handleAdd(e){
            e.preventDefault()
            fetch(`${server}/test`,{
                method:"POST",
                headers:{"Accept": "application/json","Content-type": "application/json"},
                body:JSON.stringify({Info:props.selectedInfo})})
                .catch(err=>console.log(err))


                fetch(`${server}/settingsTable`,{
                    method:"POST",
                    headers:{"Accept": "application/json","Content-type": "application/json"},
                    body:JSON.stringify({year:props.selectedYear,day:props.selectedDay})})
                    .then(res=>res.json())
                    .then(data=>{props.setSettingsData(data)})
                    .catch(err=>console.log(err))
        }

    
    return(
        <div className="room-settings-container lft-mrg">

            
            <form className="room-settings">

                <select value={props.selectedInfo.day} className="selection day" onChange={handleDay} >
                    <option value="DIM">DIMANCHE</option>
                    <option value="LUN">lUNDI</option>
                    <option value="MAR">MARDI</option>
                    <option value="MER">MERCREDI</option>
                    <option value="JEU">JEUDI</option>
                </select>


                <select value={props.selectedInfo.year} className="selection year" id="year" onChange={handleYear} >
                    <option value="1CP">1CP</option>
                    <option value="2CP">2CP</option>
                    <option value="1CS">1CS</option>
                    <option value="2CS">2CS</option>
                    <option value="3CS">3CS</option>
                </select>


                <select value={props.selectedInfo.group} className="selection Group" onChange={handleGroup}>
                    {groupElements}
                </select>

                <select value={props.selectedInfo.type} className="selection type" onChange={handleType}>
                    <option value="CC">CC</option>
                    <option value="TD">TD</option>
                    <option value="TP">TP</option>
                </select>

                <select value={props.selectedInfo.salle} className="selection Salle" onChange={handleSalle}>
                    {roomsElement}
                </select>

                <select value={props.selectedInfo.hour} className="selection hour" onChange={handleHour}>
                    {hoursElement}
                </select>

                <select value={props.selectedInfo.module} className="selection module" onChange={handleModule}>
                    {moduleElement}
                </select>
                


                <button onClick={handleAdd} className="settings-button" type="">Add</button>
                <button onClick={handleUpdate} className="settings-button" type="">Update</button>
                <button onClick={handleRemove} className="settings-button" type="">Remove</button>
                <button onClick={handleRemoveAll} className="settings-button" type="">Remove All</button>

            </form>
        </div>
    )
}

export default RoomStgs