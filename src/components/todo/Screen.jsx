import React from "react";
import TodoApp from './Todo';
import { useState,useEffect } from "react";
import ProgressBar from "../dashboard/ProgressBar";
import data from "../../data/data";


const Screen = ({currentMilestone})=>{
    const [tasksCompleted , setTasksCompleted] = useState(0);
    const [deliveriesCompleted , setDeliveresCompleted] = useState(0);
    const [id , setID] = useState();
    const [per,setPer]= useState(0);

    const [isDaytoggled , setToggle ] = useState(false);
    const handleDeli = (l)=>{
        setDeliveresCompleted(l);
      }

      const deadlineToggleHandle= ()=>{
        setToggle(!isDaytoggled);
      }
      const calculateDate = (deadline) => {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + parseInt(deadline));
        return futureDate.toDateString();
      };

      useEffect(()=>{

        setDeliveresCompleted(currentMilestone.deliveres_comepleted);
        setTasksCompleted(currentMilestone.tasks_completed);
        setPer(currentMilestone.per);



   
      }, [currentMilestone] ); 
      

      const handleTasks = (l)=>{
        setTasksCompleted(l);
      }
      // useEffect(()=>{
      //   console.log('====================================');
      //   console.log('currentmilstone',currentMilestone);
      //   console.log('====================================');

      // }
      // ,[id])


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

          const calculateDate2 = (timeline) => {
            const today = new Date();
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + parseInt(timeline));
            return getDaysBetweenDates(today,futureDate);
          };
    useEffect(()=>{

          currentMilestone= {...currentMilestone, tasks_completed : tasksCompleted}
          currentMilestone= {...currentMilestone, deliveres_comepleted : deliveriesCompleted}

          setPer((((tasksCompleted /currentMilestone.tasks.length)+(deliveriesCompleted/currentMilestone.deliverables.length))/2)*100 );    
          currentMilestone.per = per;
          
          data.milestones.find((item) => item.milestone_name === currentMilestone.milestone_name);
          data.milestones[ data.milestones.findIndex((item) => item.milestone_name === currentMilestone.milestone_name)]  = currentMilestone;
          console.log('====================================');
          console.log(`status `,   data);
          console.log('====================================');

      },[per,tasksCompleted,deliveriesCompleted] )

    return  <div>
    <div className="milestone screen-header">

    <h2 >

    {currentMilestone.milestone_name}
    
    <ProgressBar progress = {per} width={70}/>
    
    
    </h2>
    <h1 classname ='screen-card' onClick={deadlineToggleHandle}>{isDaytoggled? calculateDate(currentMilestone.timeline * 7) : `${calculateDate2(currentMilestone.timeline * 7)} days`}</h1>
    </div>



 <TodoApp data={currentMilestone} precompleted = {tasksCompleted} tasks ={currentMilestone.tasks} title = 'tasks' controller={handleTasks}></TodoApp>
 <TodoApp data = {currentMilestone} precompleted = {deliveriesCompleted} tasks ={currentMilestone.deliverables} title = 'deliverables' controller={handleDeli}></TodoApp>


    


  </div>;

}
export default Screen;