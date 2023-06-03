import React from "react";
import { useTable } from "react-table";
import RoomData from "../../data/RoomData.json"
import { Columns } from "../../data/Columns";

import "./styles.css"
import axios from "axios";


<<<<<<< Updated upstream
function RoomTable(){
    const columns = React.useMemo(()=> Columns )
    const data = React.useMemo(()=>RoomData , [])

=======
function RoomTable(props){
    
    const [roomData,setRoomData] = React.useState([])
    const [salles , setSalles] = React.useState([])
    const [selectedDay,setSelectedDay] = React.useState("DIM")
    const [selectedSalle,setSelectedSalle] = React.useState("every-room")
    const [isEveryState,setIsEveryState] = React.useState(true)
    
    

    const salleElements = salles.map(salle=>{
        return <option key={salle} value={salle}>{salle}</option>
    })

    function handleSalle(e){
        setSelectedSalle(e.target.value)
        e.target.value === "every-room" ? setIsEveryState(true) : setIsEveryState(false)
        axios.get(`${server}/roomTable`,{
            headers:{
                "ngrok-skip-browser-warning":"any"},
            params:{
                jour:selectedDay,
                isEvery: e.target.value === "every-room" ?true:false,
                salle:e.target.value
            }
        })
        .then(res=>setRoomData(res.data.roomData))
        .catch(err=>console.log(err))
        
    }



    function handleDay(e){
        setSelectedDay(e.target.value)
        console.log(e.target.value)
        axios.get(`${server}/roomTable`,{
            headers:{
                "ngrok-skip-browser-warning":"any"},
            params:{
                jour:e.target.value,
                isEvery: isEveryState,
                salle:selectedSalle
            }
        })
        .then(res=>setRoomData(res.data.roomData))
        .catch(err=>console.log(err))
    }

    React.useEffect(()=>{  
        axios.get(`${server}/roomTable`,{
            headers:{
                "ngrok-skip-browser-warning":"any"},
            params:{
                jour:selectedDay,
                isEvery: isEveryState,
                salle:selectedSalle
            }
        })
        .then(res=>{
            setRoomData(res.data.roomData)
            setSalles(res.data.rooms)
        })
        .catch(err=>console.log(err))
    },[])


    const columns = React.useMemo(()=> Columns )
    const data = React.useMemo(()=>roomData , [roomData])
>>>>>>> Stashed changes

    const tableInstance = useTable({
        columns,
        data
    })

    
    const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance


    
    

    const headersGroupElements = headerGroups.map(headerGroup =>(
        <tr  {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map(column =>(
                    <th   {...column.getHeaderProps({className:`${column.id}`})}>{column.render("Header")}</th>
                ))
            }
            
        </tr>
        )) 


        const rowsElements = rows.map(row=>{
            prepareRow(row)
            return(
            <tr {...row.getRowProps()}>
                {
                    row.cells.map(cell =>{
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    })
                }
            </tr>
            )
        })

    return(
        <>

<<<<<<< Updated upstream
            <div className="room-table-container">
=======
            <div className={`room-table-container ${props.className}`}>
                <div className="room-sett">
                    <select value={selectedSalle} className="room-select" onChange={handleSalle}>
                        <option value="every-room">every room</option>
                        {salleElements}
                    </select>
                    <select value={selectedDay} className="room-select" onChange={handleDay}>
                        <option value="DIM">DIMANCHE</option>
                        <option value="LUN">lUNDI</option>
                        <option value="MAR">MARDI</option>
                        <option value="MER">MERCREDI</option>
                        <option value="JEU">JEUDI</option>
                    </select>
                </div>
                
>>>>>>> Stashed changes
                <table {...getTableProps()}>
                    <thead>
                        {headersGroupElements}    
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rowsElements}
                    </tbody>
                </table>
            </div>
        </>
        
    )
}

export default RoomTable ;