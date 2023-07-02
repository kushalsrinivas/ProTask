import React, { useEffect } from 'react';
import { useState } from 'react';

import data from './data/data';
import './App.css';
import { useParams } from 'react-router-dom';
import Milestone from './components/Milestone';
import ProgressBar from './components/dashboard/ProgressBar';
import Screen from './components/todo/Screen';
import Dashboard from './components/dashboard/Dashboard';

import { useNavigate } from 'react-router-dom';
import Maindata from './maindata';


function App() {
  const {name} = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isBurgerActive, setIsBurgerActive] = useState(true);
  const [currentMilestone, setMilestone] = useState({});
  const [toggleDash , setDash] = useState(true);
  const [progress , setProgress] = useState(0);
  const navigate = useNavigate();
 // Retrieve the selected item from URL parameters
 
  const handleGoBack = () => {
    navigate('/'); // Navigate back to the ItemListPage
  };



  useEffect(()=>{
    var sum =0 ;
    const newData = Maindata.find((item)=> item.project_name === name);
    Object.assign(data, newData);
    var count = 0 ; 
    data.milestones.map((milestone , id)=>{
      sum += milestone.per;
      count++;
    })
    setProgress(sum/count);
  },[name]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsBurgerActive(!isBurgerActive);
  };
  const toggleMilstone = (id)=>{
    setMilestone(data.milestones[id]);
    setDash(false);
  }
  const handleDashboardToggle =()=>{
    setDash(!toggleDash);
  }




  return (
   <div className='container'>
      <div>
      <button className={`toggle-button ${isBurgerActive ? 'active' : ''}`} onClick={toggleDrawer}>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>
          <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
      <div className='navigation'>
        <button  onClick={toggleDrawer} >back</button>
        <button  onClick={handleGoBack} >home</button>
      </div>
      

          {Object.entries(data).length !==0 && <div className="drawer-content">
              <h1 onClick={handleDashboardToggle}>{data.project_name}</h1>
              <ProgressBar progress={progress} width={55}/>
              <h2>
                Milestones
              </h2>
              <div className='milestone-container'>

                {data.milestones.map((milstone, id)=>{
              
                return <div>
                <Milestone 
                  key = {id} 
                  id= {id}
                  milestone={milstone}
                  controller = {toggleMilstone}
                    ></Milestone>

                  </div>;
                })}
              </div>
            </div>}
          </div>
    </div>

  {Object.entries(data).length !==0 && <div className={`content ${isDrawerOpen ? 'drawer-open' : ''}`}>
    
   {
     toggleDash? 
      <>
      <Dashboard progress={progress}></Dashboard>

      </>:
      <>
   <Screen currentMilestone = {currentMilestone}/>
      </>
    
    
   }



   </div> }
   
   </div>
  
  );
}

export default App;
