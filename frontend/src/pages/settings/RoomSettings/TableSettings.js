import React from "react";
import "./styles.css"
import {dataColumns} from "../../../data/dataColumns"
import { useTable } from "react-table";
import { server } from "../../../data/server";
import axios from "axios";

function TableSettings(props){
    

    const columns = React.useMemo(()=> dataColumns )
    const data = React.useMemo(()=>props.settingsData , [props.settingsData])
    
    
    React.useEffect(()=>{
            
        // // console.log("hello simoh")
        // axios.get(`${server}/settingsTable`,{
        //         headers:{
        //             "ngrok-skip-browser-warning":"any"},
        //         params:{
        //             year:props.selectedYear,
        //             day:props.selectedDay
        //         }
        //     })
        //     .then(res=>props.setSettingsData(res.data))
        //     .catch(err=>console.log(err))

        axios.get(`${server}/settingsTable`,{
            headers:{
                "ngrok-skip-browser-warning":"any"},
            params:{
                year:props.selectedYear,
                day:props.selectedDay
            }
        })
        .then(res=>{
            
            props.setSettingsData(res.data)
            
        })
        .catch(err=>console.log(err))


        axios.get(`${server}/groupeTableSettings`,{
            headers:{
                "ngrok-skip-browser-warning":"any"},
            params:{
                word:"hello arslan"
            }
        })
        .then( res=> res)
        .catch(err=>console.log(err))  
    },[props.selectedDay,props.selectedYear]);



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
            IDSeance:row.original.IDSeance
        }))
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