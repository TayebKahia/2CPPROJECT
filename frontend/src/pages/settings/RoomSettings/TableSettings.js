import React from "react";
// import { Columns } from "../../../data/settingsColumn";
import "./styles.css"
import {dataColumns} from "../../../data/dataColumns"
// import  settingsData  from "../../../data/settingsData.json"
import { useTable } from "react-table";


function TableSettings(props){

    const [settingsData,setSettingsData]= React.useState([])

    React.useEffect(()=>{
        fetch("http://127.0.0.1:8000/settings")
        .then(res=>res.json())
        .then(data=>{
            setSettingsData(data)
            
        })
        .catch(err=>console.log(err))
    },[props.selectedInfo])

    const columns = React.useMemo(()=> dataColumns )
    const data = React.useMemo(()=>settingsData , [settingsData])


    const handleRowClick = (row) => {
        console.log('Clicked row data:', row.original);
        props.setSelectedYear(row.original.year)
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