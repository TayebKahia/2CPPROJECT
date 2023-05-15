import './Cour.css';
import Session from './Session';


const Cour= (props)=>{



return(
<div className="container">
<div className="type">{props.type}</div> 
<div className="module_name">{props.moduleName}</div> 
<div className="group">{props.group}</div>
<div className="prof">{props.prof}</div>
</div>
)

}
export default Cour ;