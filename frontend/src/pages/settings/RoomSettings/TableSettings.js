import React from "react";
import "./styles.css"
import {dataColumns} from "../../../data/dataColumns"
import { useTable } from "react-table";
import { server } from "../../../data/server";

function TableSettings(props){
    
    // const memo = React.useMemo()

    const columns = React.useMemo(()=> dataColumns )
    const data = React.useMemo(()=>props.settingsData , [props.settingsData])
    

    React.useEffect(()=>{
        fetch(`${server}/settingsTable`,{
            method:"POST",
            headers:{"Accept": "application/json","Content-type": "application/json"},
            body:JSON.stringify({year:props.selectedYear,day:props.selectedDay})})
            .then(res=>res.json())
            .then(data=>{props.setSettingsData(data)})
            .catch(err=>console.log(err))
            
    },[]);



    const handleRowClick = (row) => {
        console.log('Clicked row data:', row.original);
        props.setSelectedInfo(prevSelectedInfo => ({...prevSelectedInfo,
            year:row.original.year,
            day:row.original.day,
            hour:row.original.hour,
            type:row.original.type,
            salle:row.original.salle,
            module:row.original.module,
            teacher:row.original.teacher,
            group:row.original.group,
            IDSeance:row.original.IDSeance}))
    }
    
    const tableInstance = useTable({
        columns,
        data
    })

    const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance


        const headersGroupElements = headerGroups.map(headerGroup =>(
            <tr  {...headerGroup.getHeaderGroupProps()}>
                {
                    headerGroup.headers.map(column =>(
                        <th   {...column.getHeaderProps()}>{column.render("Header")}</th>
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
        <div className="room-table-container settings-case">
            <table {...getTableProps()}>
                    <thead>
                        {headersGroupElements}    
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rowsElements}
                    </tbody>
            </table>
        </div>
    )
}


export default TableSettings