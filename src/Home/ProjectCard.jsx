import { useState } from "react";
import React from "react";
const ProjectCard = (props) =>{
    return  <>
        <div className={`projects card ${props.priority} `} >
            <h3>{props.name}</h3>
            <h6>{props.objective}</h6>
        </div>
    </>; 
}

export default ProjectCard;