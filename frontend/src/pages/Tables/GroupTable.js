import React, { useEffect, useState } from "react";
import { GroupColumns } from "../../data/GroupColumns";
// import GroupData from "../../data/GroupData.json"
import { useTable } from "react-table";
import "./tableStyles.css";

import { server } from "../../data/server";


function GroupTable(props){

    const [selectedCycle,setSelectedCycle] = useState("1CP")
    const [selectedGroup,setSelectedGroup] = useState("G1")
    
    const [GroupData,setGroupData] = useState([])
    
    useEffect(()=>{
        fetch(`${server}/tableGroupe`,{
            method:"POST",
            headers:{"Accept": "application/json","Content-type": "application/json"},
            body:JSON.stringify({cycle:selectedCycle,group:selectedGroup})})
            .then(res=>res.json())
            .then(data=>{setGroupData(data)})
            .catch(err=>console.log(err))
        },[])

    const columns = React.useMemo(()=> GroupColumns )
    const data = React.useMemo(()=>GroupData , [GroupData])

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


            function handleChange(e){
                const value = e.target.value
                if(value[0] === "G"){
                    setSelectedGroup(value)
                }else{
                    setSelectedCycle(value)
                }
                fetch(`${server}/tableGroupe`,{
                    method:"POST",
                    headers:{"Accept": "application/json","Content-type": "application/json"},
                    body:JSON.stringify({cycle:selectedCycle,group:selectedGroup})})
                    .then(res=>res.json())
                    .then(data=>setGroupData(data))
                    .catch(err=>console.log(err))
            }

    





        



        
    return(
        <div className={`group-table-container ${props.className}`}>
            <div className="options">
                <select  id="cycle-dropdown" onChange={handleChange}>
                    <option value="1CP">1CP</option>
                    <option value="2CP">2CP</option>
                    <option value="1CS">1CS</option>
                    <option value="2CS">2CS</option>
                    <option value="3CS">3CS</option>
                    
                </select>
                <select  id="groups-dropdown" onChange={handleChange}>
                    <option value="G1">G1</option>
                    <option value="G2">G2</option>
                    <option value="G3">G3</option>
                    <option value="G4">G4</option>
                    <option value="G5">G5</option>
                    <option value="G6">G6</option>
                    <option value="G6">G6</option>
                    <option value="G7">G7</option>
                    <option value="G8">G8</option>
                    <option value="G9">G9</option>
                    <option value="G10">G10</option>
                </select>
            </div>
            <div className="group-table">
                    <table {...getTableProps()}>
                        <thead>
                            {headersGroupElements}    
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rowsElements}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default GroupTable ;