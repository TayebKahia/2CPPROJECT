import "./Session.css"
const Session=(props)=>{
let  classes=props.class+" "+"container" ;
// console.log(classes) ;
return (
<div className={classes}>
<div className="type">{props.type}</div> 
<div className="module_name">{props.moduleName}</div> 
<div className="group">{props.group}</div>
<div className="prof">{props.prof}</div>
<div className="salle">{props.salle}</div>
</div>
)
}
export default Session;
