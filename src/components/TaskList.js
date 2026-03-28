import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

function TaskList({ setAuth }) {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [dark, setDark] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        if (tasks.length > 5) {
            alert('You are productive Today!');
        }
    }, [tasks]);
    const fetchTasks = async() => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching task : ', error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuth(false);
    };
    useEffect(() => {
        fetchTasks();
    }, []);
return (
    <div className={dark ? 'bg-black text-white' : 'bg-white'}>
        
        <div className="max-w-4xl mx-auto p-4">
            
            <input
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                }}
                
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="border p-2 w-full rounded shadow-sm border-black"
            />
            
            {/* Dropdown */}
            {showDropdown && search ? (
                <p className="p-2 text-gray-500 ">No results</p>
            ) : showDropdown && filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => {
                            setSearch(task.title);
                            setShowDropdown(false);
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                    >
                        {task.title}
                    </div>
                ))
            ) : null}
            
        </div>
        
        <AddTask refresh={fetchTasks} />
        {tasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                refresh={fetchTasks}
            />
        ))}
        <button
            onClick={() => setDark(!dark)}
            className="bg-blue-300 py-2 rounded my-1"
        >
            Toggle Dark Mode
        </button>
        <button
            className="bg-blue-500 py-3 px-4 my-1 py-2 text-white rounded"
            onClick={handleLogout}
            style={{ float: 'right' }}
        >
            Logout
        </button>
    </div>
);
}
export default TaskList;