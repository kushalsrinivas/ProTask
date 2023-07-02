
import React, { useState } from "react";

import './home.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCopy } from 'react-icons/ai';
import Maindata from "../maindata";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
const Home  = ()=>
{
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [projectName, setProjectName] = useState('');

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isBurgerActive, setIsBurgerActive] = useState(false);
    const [priority , setPriority] = useState('none');
    const [os , setOS] = useState('none');
    const [platform , setPlatform] = useState('none');

    const [selectedDate, setSelectedDate] = useState(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setIsBurgerActive(!isBurgerActive);
      };
  
    const handleOpenForm = () => {
      setShowForm(true);
    };
 
    const handleCloseForm = () => {
      setShowForm(false);
      setProjectName('');
    };
  
    const handleInputChange = (e) => {
      setProjectName(e.target.value);
    };
    const handleReponseChange = (e)=>{
      const jsonString = e.target.value;

        setResponse(jsonString);
  
    }
  
    const handleCopy = (e) => {
      const template = `
      Create a project plan for project for ${os} ${platform}app which is a ${projectName} . Deadline for the project : ${selectedDate}. Include tasks, deliverables, and milestones. 
      Also, include how long it would likely take to reach each milestone. 
      in json format in which the keys should include 
      “project_name”  = project name
       , “project_id”  = unique project id
      ,  “objective” = brief overview of the project, 
       ,”milestones” = milestones corresponding list of 
-“milestone_name”= name of the corresponding milestone
-“tasks”= corresponding tasks
- “deliverables” = corresponding deliverables , 
-“timeline” = timline of the milestone in days,
-“tasks_completed”  set the initial value to 0 for each milestone, 
-“per” set the initial value to 0 for each milestone,
-“deliveres_comepleted”  set the initial value to 0 for each milestone, 
      .”total_number_of_tasks” = total number of tasks ,�
“total_number_of_deliverables” =  total number of deliverables,
       .”deadline” = deadline in days from today,
      “priority” set to ${priority} , 
      ,brainstorm to include the list of ideas generated for the project, here is an example for reference : {
  "project_name": "projectName",
  "project_id": "projectID",
  "objective": "Brief overview of the project",
  "milestones": [
    {
      "milestone_name": "Milestone 1",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverables": ["Deliverable 1", "Deliverable 2", "Deliverable 3"],
      "timeline": 10,
      "tasks_completed": 0,
      "per": 0,
      "deliverables_completed": 0
    },
    {
      "milestone_name": "Milestone 2",
      "tasks": ["Task 4", "Task 5", "Task 6"],
      "deliverables": ["Deliverable 4", "Deliverable 5", "Deliverable 6"],
      "timeline": 7,
      "tasks_completed": 0,
      "per": 0,
      "deliverables_completed": 0
    },
    {
      "milestone_name": "Milestone 3",
      "tasks": ["Task 7", "Task 8", "Task 9"],
      "deliverables": ["Deliverable 7", "Deliverable 8", "Deliverable 9"],
      "timeline": 14,
      "tasks_completed": 0,
      "per": 0,
      "deliverables_completed": 0
    }
  ],
  "total_number_of_tasks": 9,
  "total_number_of_deliverables": 9,
  "deadline": "selectedDate",
  "priority": "priority",
  "brainstorm": ["Idea 1", "Idea 2", "Idea 3"]
}

 output it in a codebox so that its easier to copy

      `
      navigator.clipboard.writeText(template);
    };
    const handleSubmit = (e)=>{
      e.preventDefault();

      const parsedJson = JSON.parse(response);
      setResponse(parsedJson);

      Maindata.push(Object.getPrototypeOf(Object.create(parsedJson)));




      handleCloseForm();
    }
    const disablePastDates = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
      };

      const handleDROPdown = (e)=>{
        setPriority(e.target.value);

      }
      const handleplatform = (e)=>{
        setPlatform(e.target.value);

      } 
      const handleos = (e)=>{
        setOS(e.target.value);

      }
    
    return (


        <div>
        <div>
    <button className={`toggle-button ${isBurgerActive ? 'active' : ''}`} onClick={toggleDrawer}>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
        <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
    <div className='navigation'>
      <button className="action-button"  onClick={toggleDrawer} >back</button>
      <button className="action-button" onClick={toggleDrawer} >home</button>
    </div>
    

        <div className="drawer-content">
       
          </div>
        </div>
  </div>
        <div className={`content ${isDrawerOpen ? 'drawer-open' : ''}`}>

          <h1>Welcome to the Home Page</h1>
            <h2>Create New Project</h2>
          <div className="create-project-section  ">
            {!(showForm) && (
              <button className = 'create-button' onClick={handleOpenForm}>
                <span>&#43;</span> Create New
              </button>
            )}
            {showForm && (
                <div className="form-container">

              <form onSubmit={handleSubmit} className="project-form form">
                <div className='query-container'>

                <textarea
                  type="text"
                  rows={4}
                  cols={500}
                  value={projectName}
                  onChange={handleInputChange}
                  placeholder =  "Enter project discription"
                />
                <button className="copy-button" onClick={handleCopy} type="button">Copy<AiOutlineCopy/> </button>
                </div>
                <div className="query-container">

                <textarea
                  type="json"
                  rows={4}
                  cols={500}
                  value={response}
                  onChange={handleReponseChange}
                  placeholder =  "Paste JSON here"
                />
                  <button className="copy-button" type="submit">Create</button>

                </div>
                   <div className="dropdown-container">
                    <select value={priority} onChange={handleDROPdown} className="dropdown">
                        <option value="">Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">low</option>
                    </select>
                    <select value={platform} onChange={handleplatform} className="dropdown">
                        <option value="">type</option>
                        <option value="mobile">Mobile</option>
                        <option value="desktop">Desktop</option>
                        <option value="web">Web</option>
                        <option value="cross platform">cross platform</option>

                    </select>
                    <select value={os} onChange={handleos} className="dropdown">
                        <option value="">OS</option>
                        <option value="andriod">Andriod</option>
                        <option value="ios">IOS</option>
                        <option value="web">Web</option>
                        <option value="windows">Windows</option>
                        <option value="mac">Mac</option>
                        <option value="cross mobile">cross mobile</option>
                        <option value="cross platform">cross platform</option>
                    </select>
                    <div className="date-picker-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Deadline date"
                        filterDate={disablePastDates}
                        className="custom-date-picker datepicker"
                    />
                    </div>
    </div>
                <div className="form-buttons">

                  <button className="action-button" type="button" onClick={handleCloseForm}>
                    Close
                  </button>
                </div>
              </form>
                </div>

            )}
          
        </div>
        <div className="project sections">
        <h1>
          Projects 
        </h1>
        <div className="card-section">

         {
          Maindata.map((item,id)=>{
          return <Link to={`/selected/${item.project_name}`}>

              <ProjectCard 
              key = {id} 
              name = {item.project_name}
              objective  = {item.objective}
              priority = {item.priority}
              / >
          </Link>         
          ;
        }
        )
        } 
        </div>
        </div>
          </div>
        </div>
      );
}

export default Home;