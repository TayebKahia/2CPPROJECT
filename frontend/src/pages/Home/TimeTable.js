import React from "react";

import "./TimeTable.css";

import scheduleData from "../../data/scheduleData.json";
import Day from "./TimeTableComponents/day";

import TimeLine from "./TimeTableComponents/TimeLine";

function TimeTable() {
  return (
    <div className="main_container">
      <TimeLine/>
<Day  day={scheduleData.filter(object =>{return object.day==="Dimanche"})} />
<Day class="even" day={scheduleData.filter(object =>{return object.day==="Lundi"})} />
<Day day={scheduleData.filter(object =>{return object.day==="Mardi"})} />
<Day class="even" day={scheduleData.filter(object =>{return object.day==="Mercredi"})} />
<Day day={scheduleData.filter(object =>{return object.day==="Jeudi"})} />
    </div>
  );
}

export default TimeTable;
