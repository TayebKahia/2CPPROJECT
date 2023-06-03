import React, { useEffect, useState } from "react";
import GroupTableSettings from "./GroupTableSettings";
import GroupTable from "./GroupTable";
import axios from "axios";



function Group (){

    const [GroupData,setGroupData] = useState([])
    const [groups,setGroups] = React.useState([])
    const [selectedCycle,setSelectedCycle] = useState("1CP")
    const [selectedGroup,setSelectedGroup] = useState("G01")

    return(
        <>
            <GroupTableSettings 
                GroupData={GroupData} 
                setGroupData={setGroupData}
                groups={groups}
                setGroups={setGroups}
                selectedCycle={selectedCycle}
                setSelectedCycle={setSelectedCycle}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                />
            <GroupTable 
                GroupData={GroupData} 
                setGroupData={setGroupData}
                groups={groups}
                setGroups={setGroups}
                selectedCycle={selectedCycle}
                setSelectedCycle={setSelectedCycle}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                />
        </>
    )
}

export default Group ;