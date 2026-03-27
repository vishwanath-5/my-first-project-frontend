import React, { useState } from "react";
import { addTask } from "../services/api";

function AddTask({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      await addTask({
        title,
        description,
        completed: false,
      });
      await refresh();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
    setTitle("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />{" "}
      <button type="submit"> Add Task </button>{" "}
    </form>
  );
}
export default AddTask;
