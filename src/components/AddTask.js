import React, { useState } from 'react';
import { addTask } from '../services/api';

function AddTask({ refresh }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [dueDate, setDueDate] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    try {
      const isoDate = dueDate ? new Date(dueDate).toISOString() : null;
      await addTask({
        title,
        description,
        priority,
        due_date: isoDate,
        completed: false,
      });
      await refresh();
      setTitle('');
      setDescription('');
      setPriority('LOW');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 md:grid md:grid-cols-5 md:gap-2"
    >
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />{' '}
      <select
        className="border p-2 rounded w-full"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="LOW"> Low </option>{' '}
        <option value="MEDIUM"> Medium </option>{' '}
        <option value="HIGH"> High </option>{' '}
      </select>{' '}
      <input
      placeholder='Due date'
        className="border p-2 rounded w-full"
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />{' '}
      <input
        className="border p-2 rounded w-full"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />{' '}
      <button className="bg-blue-500 text-white px-4 rounded" type="submit">
        {' '}
        Add Task{' '}
      </button>{' '}
    </form>
  );
}
export default AddTask;
