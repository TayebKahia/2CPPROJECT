import React, { useEffect, useState } from "react";
import { GroupColumns } from "../../../data/GroupColumns";
import { useTable } from "react-table";
import "../tableStyles.css";
import "../styles.css"
import GroupData  from "../../../data/GroupData.json"
import GroupTableSettings from "./GroupTableSettings";
import { server } from "../../../data/server";
import axios from "axios";



function GroupTable(props){
    // const [GroupData,setGroupData] = useState([])
    const columns = React.useMemo(()=> GroupColumns )
    const data = React.useMemo(()=>props.GroupData , [props.GroupData])


    

    const tableInstance = useTable({
        columns,
        data
    })
    
    const {getTableProps, getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance
    
    
        useEffect(()=>{
            // axios.get(`${server}/tableGroupe`,{
            //     headers:{
            //         "ngrok-skip-browser-warning":"any"},
            //     params:{
            //         cycle:props.selectedCycle
            //     }
            // })
            // .then(res=> props.setGroups(res.data))
            // .catch(err=>console.log(err))

            axios.get(`${server}/tableGroupe`,{
                headers:{
                    "ngrok-skip-browser-warning":"any"},
                params:{
                    cycle:props.selectedCycle,
                    group:props.selectedGroup
                }
            })
            .then( res=> props.setGroupData(res.data))
            .catch(err=>console.log(err))
        },[])





        
        
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
                <tr {...row.getRowProps()} onClick={()=>props.onRowClick(row)}>
                    {
                        row.cells.map(cell =>{
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        })
                    }
                </tr>
                )
            })




            

    



            

        



        
    return(
        
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
        
    )
}

export default GroupTable ;