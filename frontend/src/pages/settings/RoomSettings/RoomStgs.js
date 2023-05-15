import React from "react";
import "./styles.css"



function RoomStgs(){
    return(
        <div className="room-settings-container">
            <div className="room-settings">
                <label>
                    name
                    <input type="text" name="" value="" />
                </label>
                <label>
                    capacity
                    <input type="text" name="" value="" />
                </label>
                8-10:
                <label for="">
                    module
                    <select>
                        <option value="mudule">module</option>
                    </select>
                    group
                    <select>
                        <option value="groups">hello</option>
                    </select>
                </label>
                10-12:
                <label for="">
                    module
                    <select>
                        <option value="mudule">module</option>
                    </select>
                    group
                    <select>
                        <option value="groups">hello</option>
                    </select>
                </label>

                12-14:
                <label for="">
                    module
                    <select>
                        <option value="mudule">module</option>
                    </select>
                    group
                    <select>
                        <option value="groups">hello</option>
                    </select>
                </label>

                14-16:
                <label for="">
                    module
                    <select>
                        <option value="mudule">module</option>
                    </select>
                    group
                    <select>
                        <option value="groups">hello</option>
                    </select>
                </label>
                <button className="settings-button" type="">Update</button>
                <button className="settings-button" type="">Remove</button>
                <button className="settings-button" type="">add</button>
            </div>
        </div>
    )
}

export default RoomStgs