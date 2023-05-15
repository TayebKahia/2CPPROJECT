import React from "react";


function TableDescription (props){
    return(
        <div className="table-descrp-container" style={{flexDirection:`${props.flexDirection}`}} >
            <div className="descrp-text"> 
                <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </span>
            </div>
            <div className="table-pic" >
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default TableDescription