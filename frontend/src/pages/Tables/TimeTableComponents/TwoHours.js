import Session from "./Session";
import "./TwoHours.css";

const TwoHours = (props) => {
  return (
    <div className="hour_container">
<<<<<<< Updated upstream
      {props.twoHours.map((object, index) => {
        return (
          <Session
            class={index % 2 === 0 ? "without_background" : "with_background"}
            type={object.type}
            moduleName={object.moduleName}
            group={object.group}
            prof={object.prof}
            salle={object.salle}
          />
        );
      })}
    </div>
  );
};
export default TwoHours;
=======
   
    { 
        props.twoHours.map((object,index)=>{
       return <Session class={index%2===0 ? "without_background":"with_background"} type={object.type} moduleName={object.moduleName} group={object.group} prof={object.prof} salle={object.salle} />
      })

    }
       </div>

)}
export default TwoHours;
>>>>>>> Stashed changes
