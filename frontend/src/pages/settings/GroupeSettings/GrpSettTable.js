import React, { useEffect, useState } from "react";
import { GroupSettHeaders } from "../../../data/GroupSettHeaders";
import { useTable } from "react-table";
import axios from "axios";
import { server } from "../../../data/server";
import GroupData from "../../../data/GroupData.json"
import "./styles.css"

function GrpSettTable (props){

    const [groupData,setGroupData] = useState([])
    const columns = React.useMemo(()=> GroupSettHeaders )
    const data = React.useMemo(()=>props.groupData , [props.groupData])


    const tableInstance = useTable({
        columns,
        data
    })
    
    const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance


    const onRowClick = (row) => {
        console.log('Clicked row data:', row.original);
    }

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
            <tr {...row.getRowProps()} onClick={()=>onRowClick(row)}>
                {
                    row.cells.map(cell =>{
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    })
                }
            </tr>
            )
        })


        
        

        useEffect(()=>{
            axios.get(`${server}/groupeTableSettings`,{
                headers:{
                    "ngrok-skip-browser-warning":"any"},
                params:{
                    IDEns:props.profID
                }
            })
            .then(res=>{
                props.setGroupData(res.data)
            })
            .catch(err=>console.log(err))
        },[])



    return(
        <div className="grp-sett-table">
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

export default GrpSettTable