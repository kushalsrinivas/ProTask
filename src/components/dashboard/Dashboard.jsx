import React from "react";
import data from "../../data/data";
import PieChart from "./Piechart";
import ProgressBar from "./ProgressBar";
import Timeline from "./Timeline";



const Dashboard = (props)=>{
    const calculateDate = () => {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + parseInt(data.deadline));
        return futureDate.toDateString();
      };
      const tasks = []
      const names = []
      const deliverables = []
      data.milestones.map((milestone, id)=>{
        tasks.push(milestone.tasks.length)
        names.push(milestone.milestone_name)
        deliverables.push(milestone.deliverables.length)
      });




    return<>
    <h1>{data.project_name}</h1>
      <h2>{data.objective}</h2>
      <h4>Deadline : {calculateDate()}</h4>
      <ProgressBar progress={props.progress} width={30}/>
      <br></br>
   


      <div className="chart-container">
      <PieChart labels = {['Tasks', 'Deliverables']} values = {[data.total_number_of_deliverables,data.total_number_of_tasks ]} text = {'T&D'} />
      <PieChart labels = {names} values = {tasks} text = {'tasks'}/>
      <PieChart labels = {names} values = {deliverables} text = {'deliverables'}/>

      </div>
    <Timeline/>
    </>
    ; 
}

export default Dashboard;