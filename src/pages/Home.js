import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("https://srinivas-restomart.onrender.com/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const deleteTask = async (id) => {
    await fetch(`https://srinivas-restomart.onrender.com/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks(); // refresh list
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Link to="/add" className="btn"> Add Task</Link>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <small>Status: {task.status}</small><br/>
            <small>Created: {task.createdAt?.split("T")[0]}</small>
            <small>Due: {task.dueDate?.split("T")[0]}</small>
            <small>Update Date: {task.updatedAt?.split("T")[0]}</small>
            <div className="btn-group">
              <Link to={`/edit/${task.id}`} className="btn"> Edit</Link>
              <button onClick={() => deleteTask(task.id)} className="btn red">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
