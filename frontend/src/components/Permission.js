import React from "react";


function Permission (props){
    return(
        <div onClick={props.onClick} className="permission">
            {props.text}
        </div>
    )
}

export default Permission