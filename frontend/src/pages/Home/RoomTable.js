import React from "react";
import { useTable } from "react-table";
import RoomData from "../../data/RoomData.json"
import { Columns } from "../../data/Columns";

import "./styles.css"


function RoomTable(){
    const columns = React.useMemo(()=> Columns )
    const data = React.useMemo(()=>RoomData , [])


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

            <div className="room-table-container">
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