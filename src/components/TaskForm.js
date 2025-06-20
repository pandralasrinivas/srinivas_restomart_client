import React, { useState, useEffect } from "react";

function TaskForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });

  useEffect(() => {
    // Remove priority if present in initialData
    if (initialData.id) {
      const { priority, ...rest } = initialData;
      setForm(rest);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{initialData.id ? "Edit Task" : "Create New Task"}</h2>
      
      <div className="form-group">
        <label>Title *</label>
        <input
          name="title"
          placeholder="e.g., Complete project report"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Add details..."
          value={form.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate?.split("T")[0] || ""}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn primary">
        {initialData.id ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
export default TaskForm;