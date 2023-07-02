import React, { useEffect, useState } from 'react';
import ProgressBar from './dashboard/ProgressBar';


const Milestone = (props)=>{
    const [per, setPer] = useState(props.milestone.per);



    useEffect(()=>{

        setPer(props.milestone.per);
    }
    ,[props.milestone])
    const handleClick = ()=>{
        props.controller(props.id);
    }

    return <>
    <div className='milestone' onClick={handleClick}>

    <h3 className='card-header' >{props.milestone.milestone_name}</h3>
    <ProgressBar progress={per} width={35}></ProgressBar>
    </div>
    </>;
};
export default Milestone;