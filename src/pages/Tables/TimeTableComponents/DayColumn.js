import "./DayColumn.css"

const DayColumn=(props)=>{

return (
<div className={props.class +" day_column_container"}>
{props.day}
</div>

)

}
export default DayColumn;