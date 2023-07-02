import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import './styles/todo.css';
import ProgressBar from '../dashboard/ProgressBar';

const TodoListCheck = ({ tasks ,title , controller , precompleted}) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [completed , setCompleted] = useState(precompleted);
  const [per , setPer] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleTaskToggle = (id) => {

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {

        return { ...todo, completed: !todo.completed };
      }
     
      return todo;
    });
    console.log('====================================');
    console.log('upasidapid : ',updatedTodos);
    console.log('====================================');


    sendComlpetedTasks(updatedTodos.filter((todo, id)=>todo.completed).length);

    setTodos(updatedTodos);

  };

  const sendComlpetedTasks = (length)=>{ 
    controller(length);
    setCompleted(length);
  }


useEffect(()=>{
  setPer(isNaN(( completed/todos.length )*100) ? 0 :  ( completed/todos.length )*100);
  setCompleted(precompleted);

}, )


  useEffect(()=>{


    const lst = tasks.map((task,id)=>{
        const newTodo = {
          id: uuidv4(),
          text: task,
          completed: false
        };
      return newTodo;})
    setTodos(lst);


  },[tasks])

  return (
    <div className="app">
      <h1>{title}</h1>
      <ProgressBar progress={per} width={50}/>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a task..."
        />
        <button className='' type="submit">Add Task</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
            onClick={() => handleTaskToggle(todo.id)}
          >
          
          <label className="checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleTaskToggle(todo.id)}
              className="checkbox-input"
            />
            <span className="checkbox-custom" />
          </label>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListCheck;
