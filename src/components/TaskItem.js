import React from "react";
import { deleteTask, updateTask } from "../services/api";

function TaskItem({ task, refresh }) {
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      refresh();
    } catch (error) {
      console.error("Delete error: ", error);
    }
  };
  const toggleComplete = async () => {
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
    refresh();
  };
  return (
    <div>
      <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {" "}
        {task.title}{" "}
      </h3>{" "}
      <p> {task.description} </p>{" "}
      <button onClick={toggleComplete}>
        {" "}
        {task.completed ? "Undo" : "Complete"}{" "}
      </button>{" "}
      <button onClick={handleDelete}> Delete </button>{" "}
    </div>
  );
}
export default TaskItem;
