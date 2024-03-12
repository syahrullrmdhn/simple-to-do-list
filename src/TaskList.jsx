// TaskList.js
import React from 'react';

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
          />
          <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
          <button
            className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
