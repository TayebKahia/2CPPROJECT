import "./Day.css"
import TwoHours from "./TwoHours"
import DayColumn from "./DayColumn"
import Cour from "./Cour"
const Day=(props)=>{

let classes = props.class +" day_container"
return (
<div className={classes}>

<DayColumn  class={props.day[0].day==="Jeudi" ? "border_radius_bottom_left":""} day={props.day[0].day}/>

{props.day.filter((object)=>{return object.heur ==="8-10"})[0].type ==="cour" ?<Cour type={props.day.filter((object)=>{return object.heur ==="8-10"})[0].type}  salle={props.day.filter((object)=>{return object.heur ==="8-10"})[0].salle}
 moduleName={props.day.filter((object)=>{return object.heur ==="8-10"})[0].moduleName} group={props.day.filter((object)=>{return object.heur ==="8-10"})[0].group} prof={props.day.filter((object)=>{return object.heur ==="8-10"})[0].prof}/>: <TwoHours twoHours={props.day.filter((object)=>{return object.heur ==="8-10"})}/> }


{props.day.filter((object)=>{return object.heur ==="10-12"})[0].type ==="cour" ?<Cour type={props.day.filter((object)=>{return object.heur ==="10-12"})[0].type}  salle={props.day.filter((object)=>{return object.heur ==="10-12"})[0].salle}
 moduleName={props.day.filter((object)=>{return object.heur ==="10-12"})[0].moduleName} group={props.day.filter((object)=>{return object.heur ==="10-12"})[0].group} prof={props.day.filter((object)=>{return object.heur ==="10-12"})[0].prof}/>: <TwoHours twoHours={props.day.filter((object)=>{return object.heur ==="10-12"})}/> }

{props.day.filter((object)=>{return object.heur ==="14-16"})[0].type ==="cour" ?<Cour type={props.day.filter((object)=>{return object.heur ==="14-16"})[0].type}  salle={props.day.filter((object)=>{return object.heur ==="14-16"})[0].salle}
 moduleName={props.day.filter((object)=>{return object.heur ==="14-16"})[0].moduleName} group={props.day.filter((object)=>{return object.heur ==="14-16"})[0].group} prof={props.day.filter((object)=>{return object.heur ==="14-16"})[0].prof}/>: <TwoHours twoHours={props.day.filter((object)=>{return object.heur ==="14-16"})}/> }


{props.day.filter((object)=>{return object.heur ==="16-17"})[0].type ==="cour" ?<Cour type={props.day.filter((object)=>{return object.heur ==="16-17"})[0].type}  salle={props.day.filter((object)=>{return object.heur ==="16-17"})[0].salle}
 moduleName={props.day.filter((object)=>{return object.heur ==="16-17"})[0].moduleName} group={props.day.filter((object)=>{return object.heur ==="16-17"})[0].group} prof={props.day.filter((object)=>{return object.heur ==="16-17"})[0].prof}/>: <TwoHours twoHours={props.day.filter((object)=>{return object.heur ==="16-17"})}/> }

</div>
)

}
export default Day;

