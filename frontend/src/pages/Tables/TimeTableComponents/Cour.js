import './Cour.css';
import Session from './Session';


const Cour= (props)=>{



return(
<div className="cour-container">
<div className="type">{props.type}</div> 
<div className="module_name">{props.moduleName}</div> 
<div className="group">{props.group}</div>
<div className="prof">{props.prof}</div>
<div className="salle">{props.salle}</div>
</div>
)

}
export default Cour ;