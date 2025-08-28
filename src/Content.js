import React, { useEffect, useState } from 'react'
import Items from './Items'
import { FaPlusCircle } from 'react-icons/fa'
import Popup from 'reactjs-popup'
import { addTask } from './utils/Handleapi'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Content = ({items,setitems,isLoading,error}) => {
    
    const [newTask, setNewTask] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [importantTasks, setImportantTasks] = useState([]);
    const [normalTasks, setNormalTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        setImportantTasks(
          items.filter(
            (item) =>
              !item.checked &&
              new Date(item.deadline) - new Date() <= 2 * 24 * 60 * 60 * 1000 
          )
        );

        setNormalTasks(
          items.filter(
            (item) =>
              !item.checked &&
              new Date(item.deadline) - new Date() > 2 * 24 * 60 * 60 * 1000
          )
        );

        setDoneTasks(items.filter((item) => item.checked));
      }, [items]);


    const handleAddTask = (close) => {
      if (newTask.trim() === "") return;
      if(dueDate < new Date().toISOString().split("T")[0]){
        toast("Due date cannot be in the past", {
          position: "top-right",
          autoClose: 2000,
        });
        return; 
      }

      const taskData = { text: newTask, duedate: dueDate };
      addTask(taskData , setitems , items,Navigate)
      setNewTask("");
      setDueDate("");
      close();
    };



  return (
    <div>
      <ToastContainer/>
      <Popup
        trigger={
          <div
            id="addnewitem"
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <FaPlusCircle id="addnew-icon" size={"20px"} color="green" />
            <h2 style={{ marginLeft: "8px" }}>Add New Item</h2>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <div style={{ padding: "20px 35px", minWidth: "300px" , backgroundColor:"#f0f0f0" }}>
            <h4 style={{margin:"0"}}>Add a Task</h4>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task..."
              style={{ width: "100%", padding: "8px", margin: "10px 0" }}
            />
            <h4 style={{margin:"0"}}>Due Date</h4>
            <input
              type="date"
              value={dueDate}
              placeholder='Due Date'
              onChange={(e) => setDueDate(e.target.value)}
              style={{ width: "100%", padding: "8px", margin: "10px 0" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => handleAddTask(close)}
                style={{
                  background: "green",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
              <button
                onClick={close}
                style={{
                  background: "gray",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popup>
     {
      items.length === 0 ? (
        isLoading ? <p style={{textAlign:'center'}}>Loading...</p> : error ? <p style={{textAlign:'center', color:'red'}}>{error}</p> : <p style={{textAlign:'center'}}>No Tasks to display</p>
      ) : 
      <main>
        {
          importantTasks.length > 0
          &&
          <div className='TaskContainer' id='Task-Urgent'>
              <h2>Important</h2>
              <Items items = {importantTasks } setitems={setitems}/>
          </div>
        }
        {
          normalTasks.length > 0 
          &&
          <div className='TaskContainer' id='Task-Normal'>
              <h2>Normal</h2>
              <Items items = {normalTasks} setitems={setitems}/>
          </div>
        }
        {
          doneTasks.length > 0
          &&
          <div className='TaskContainer' id='Task-Done'>
              <h2>Done</h2>
              <Items items = {doneTasks} setitems={setitems}/>
          </div>
        }
        
        
      </main>
     }
      
   </div>
  )
}

export default Content