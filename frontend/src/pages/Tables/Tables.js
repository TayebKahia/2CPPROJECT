import React from "react";
import RoomTable from "./RoomTable";
import GroupTable from "./GroupTable/GroupTable";
import TimeTable from "./TimeTable";
import Group from "./GroupTable/Group";
import "./styles.css"
import Groups from "./Groups";

function Tables (props){


    

    return(
        <div className="tables-container">
<<<<<<< Updated upstream
            {props.table === "Time Table" && <TimeTable />}
            {props.table === "Room Table" && <RoomTable />}
            {props.table === "Group Table" && <GroupTable />}
=======
            {props.table === "Time Table" && <TimeTable role={props.role} />}
            {props.table === "Room Table" && <RoomTable role={props.role} />}
            {props.table === "Group Table" && <Groups role={props.role} />}
>>>>>>> Stashed changes
        </div>
    )
}

export default Tables