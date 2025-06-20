import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://srinivas-restomart.onrender.com/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        setLoading(false);
      });
  }, [id]);

  const updateTask = async (formData) => {
    await fetch(`https://srinivas-restomart.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found.</p>;
  return <TaskForm initialData={task} onSubmit={updateTask} />;
}

export default EditTask;
