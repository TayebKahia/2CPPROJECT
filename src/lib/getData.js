import React from "react";
import axios from "axios";



const getData = (url) =>{
    return fetch(url)
    .then(res=>res.json())
    .then(data => {
        console.log(`this is your data ${data}`)
        return data;

    })
    .catch(err => console.log(err))
}

export default getData ;