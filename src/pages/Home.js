import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("https://srinivas-restomart.onrender.com/tasks");
    const data = await res.json();
    setTasks(data);
  };

  // Delete task with confirmation
  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const deleteTask = async () => {
    await fetch(`https://srinivas-restomart.onrender.com/tasks/${taskToDelete}`, {
      method: "DELETE",
    });
    fetchTasks();
    setShowConfirm(false);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    fetchTasks();
  }, [theme]);

  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter((task) => task.status === "todo"),
    in_progress: tasks.filter((task) => task.status === "in_progress"),
    done: tasks.filter((task) => task.status === "done"),
  };

  return (
    <div className="container">
      <div className="header">
        <h1>TaskFlow</h1>
        <div>
          <Link to="/add" className="add-task-btn">
            <span>+</span> New Task
          </Link>
        </div>
      </div>

      <div className="task-board">
        {/* To Do Column */}
        <div className="task-column">
          <h2>To Do ({tasksByStatus.todo.length})</h2>
          {tasksByStatus.todo.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={confirmDelete} />
          ))}
        </div>

        {/* In Progress Column */}
        <div className="task-column">
          <h2>In Progress ({tasksByStatus.in_progress.length})</h2>
          {tasksByStatus.in_progress.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={confirmDelete} />
          ))}
        </div>

        {/* Done Column */}
        <div className="task-column">
          <h2>Done ({tasksByStatus.done.length})</h2>
          {tasksByStatus.done.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={confirmDelete} />
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <h3>Delete Task?</h3>
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="dialog-actions">
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  marginRight: "8px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteTask}
                className="btn red"
                style={{
                  backgroundColor: "Red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Task Card Component
function TaskCard({ task, onDelete }) {
  return (
    <div className={`task-card ${task.status}`}>
      {/* Removed priority tag */}
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-meta">
        <span>Due: {task.dueDate?.split("T")[0] || "No deadline"}</span>
      </div>
      <div className="task-actions">
        <Link to={`/edit/${task.id}`} className="btn primary">Edit</Link>
        <button onClick={() => onDelete(task.id)} className="btn red">Delete</button>
      </div>
    </div>
  );
}
export default Home;