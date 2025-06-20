import React from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function AddTask() {
  const navigate = useNavigate();

  const createTask = async (formData) => {
    await fetch("https://srinivas-restomart.onrender.com/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    navigate("/");
  };

  return <TaskForm onSubmit={createTask} />;
}

export default AddTask;
