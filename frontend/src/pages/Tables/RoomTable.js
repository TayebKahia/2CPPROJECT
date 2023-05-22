import React from "react";
import { useTable , useRow } from "react-table";
import RoomData from "../../data/RoomData.json"
import { Columns } from "../../data/Columns";
// import {data as dataj} from "../../data/data.json"
import { server } from "../../data/server";
import "./styles.css"


function RoomTable(props){
    
    const [roomData,setRoomData] = React.useState([])
    
    React.useEffect(()=>{
        fetch(`${server}/roomTable`,{
            method:"POST",
            headers:{"Accept":"application/json","content-type":"application/json"},
            body:JSON.stringify({jour:"DIM"})
        })
        .then(res=>res.json())
        .then(data=>setRoomData(data))
        .catch(err=>console.log(err))
    },[])

    const columns = React.useMemo(()=> Columns )
    const data = React.useMemo(()=>RoomData , [RoomData])

    const tableInstance = useTable({
        columns,
        data
    })

    
    const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance


    const handleRowClick = (row) => {
        console.log('Clicked row data:', row.original);
        };
    
    
    

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
            <tr {...row.getRowProps()} onClick={(props.role !== "" && props.role!== "student") ? ()=> handleRowClick(row) : null}>
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

            <div className={`room-table-container ${props.className}`}>
                <select className="room-select">
                    <option value="every-room">every room</option>
                </select>
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