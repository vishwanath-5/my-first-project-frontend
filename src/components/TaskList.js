import React, { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";

function TaskList({ setAuth }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching task : ", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <button onClick={handleLogout} style={{ float: "right" }}>
        {" "}
        Logout{" "}
      </button>{" "}
      <AddTask refresh={fetchTasks} />{" "}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refresh={fetchTasks} />
      ))}{" "}
    </div>
  );
}
export default TaskList;
