import React from 'react';
import { deleteTask, updateTask } from '../services/api';

function TaskItem({ task, refresh }) {
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      refresh();
    } catch (error) {
      console.error('Delete error: ', error);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lb:grid-cols-4 gap-4 items-center border p-3 rounded mb-2 ">
      <div className="min-w-0 break-words max-w-[250px">
        <h3
          className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}
        >
          {' '}
          {task.title}{' '}
        </h3>{' '}
        <p className="text-sm text-gray-500"> {task.description} </p>{' '}
      </div>{' '}
      <div>
        <p> {new Date(task.due_date).toLocaleString()} </p>{' '}
        <span className="bg-yellow-200 px-2 py-1 rounded">
          {' '}
          {task.priority}{' '}
        </span>{' '}
      </div>{' '}
      <div className="flex gap-2">
        <button
          onClick={toggleComplete}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          {' '}
          {task.completed ? 'Undo' : 'Complete'}{' '}
        </button>{' '}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete{' '}
        </button>{' '}
      </div>{' '}
    </div>
  );
}
export default TaskItem;
