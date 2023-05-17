import React from "react";
import RoomTable from "./RoomTable";
import GroupTable from "./GroupTable";
import TimeTable from "./TimeTable";
import "./styles.css"

function Tables (props){
    return(
        <div className="tables-container">
            {props.table === "Time Table" && <TimeTable role={props.role} />}
            {props.table === "Room Table" && <RoomTable role={props.role} />}
            {props.table === "Group Table" && <GroupTable role={props.role} />}
        </div>
    )
}

export default Tables