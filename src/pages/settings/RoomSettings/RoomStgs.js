import React, { useEffect } from "react";
import "./styles.css"

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
            props.setSelectedYear(e.target.value)
            props.setSelectedInfo(prevInfo => ({...prevInfo,year:e.target.value}))
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
           
            fetch("http://127.0.0.1:8000/settings",{
            method:"POST",
            headers:{"Accept": "application/json","Content-type": "application/json"},
            body:JSON.stringify({year:props.selectedYear})})
            .then(res=>res.json())
            .then(data=>{
                setGroups(data.groups)
                setModules(data.modules)
                setRooms(data.rooms)
                setHours(data.hours)
                props.setSelectedInfo(prevInfo =>({...prevInfo,group:data.groups[0],salle:data.rooms[0],hours:data.hours[0],module:data.modules[0]}))
            })
            .catch(err=>console.log(err))
        },[props.selectedYear])


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
            console.log("info")
            console.log(props.selectedInfo)
            const{day,year,hour,salle,module,teacher,group,type} = props.selectedInfo
            fetch("http://127.0.0.1:8000/test",{
                method:"PUT",
                headers:{"Accept": "application/json","Content-type": "application/json"},
                body:JSON.stringify({infos:props.selectedInfo})})
                .then(response =>response.json())
                .then(data => console.log(data))
                props.setSelectedInfo(prevSelectedInfo => ({...prevSelectedInfo}))
        }
       
        function handleRemove(e){
            e.preventDefault()
            console.log("removed")
        }
    

    
    return(
        <div className="room-settings-container">
            <form className="room-settings">
                
                {/* <select>
                {props.dates.map((date)=>{
                    return <option>{date}</option>
                })}
                </select> */}

                <select value={props.selectedInfo.day.toLowerCase()} className="selection day" onChange={handleDay} >
                    <option value="sunday">sunday</option>
                    <option value="monday">monday</option>
                    <option value="tuesday">tuesday</option>
                    <option value="wednesday">wednesday</option>
                    <option value="thursday">thursday</option>
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
                    <option value="cour">Cour</option>
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
                


                <button onClick={handleUpdate} className="settings-button" type="">Update</button>
                <button onClick={handleRemove} className="settings-button" type="">Remove</button>
                <button onClick={handleUpdate} className="settings-button" type="">add</button>
            </form>
        </div>
    )
}

export default RoomStgs