import React from "react";
import StackedBarGraph from "./StackedBarGraph";
import data from '../../data/data'

const Timeline = ( )=>{
    function getDaysBetweenDates(date1, date2) {
        // Convert both dates to UTC format to avoid time zone discrepancies
        const utcDate1 = new Date(Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()));
        const utcDate2 = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()));
      
        // Calculate the difference in milliseconds
        const timeDifference = Math.abs(utcDate2.getTime() - utcDate1.getTime());
      
        // Calculate the number of days
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      
        return days;
      }
    const calculateDate = () => {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + parseInt(data.deadline ));
        return getDaysBetweenDates(today,futureDate);
      };

      const names = []
      const time = []
      data.milestones.map((milestone, id)=>{

        names.push(milestone.milestone_name)
        time.push(milestone.timeline )
      });

    return   <div>
    <div>

    <h1>Timeline</h1>
    </div>
    <div>
        <h3>
        {calculateDate()} days left until publish
        </h3>
        <div>
        <StackedBarGraph labels = {names} values = {time}/>

        </div>
        <div>

        </div>
    </div>
   </div>;
}

export default Timeline;