import React from "react";
import RoomTable from "./RoomTable";
import GroupTable from "./GroupTable";
import TimeTable from "./TimeTable";
import "./styles.css"

function Tables (props){
    return(
        <div className="tables-container">
            {props.table === "Time Table" && <TimeTable />}
            {props.table === "Room Table" && <RoomTable />}
            {props.table === "Group Table" && <GroupTable />}
        </div>
    )
}

export default Tables