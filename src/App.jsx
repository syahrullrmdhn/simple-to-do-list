// App.js
import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []); // Efek ini hanya terpanggil sekali saat komponen dimuat

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // Efek ini akan dipanggil setiap kali tasks berubah

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)' }}>
      <div className="container mx-auto max-w-md p-4 rounded-lg shadow-lg" style={{ background: 'white' }}>
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full border p-2 mr-2"
            placeholder="Tambahkan Tugas Baru"
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddTask}
          >
            Tambahkan
          </button>
        </div>
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} />
        <div className="mt-4 flex items-center justify-center">
          <a
            href="https://github.com/syahrullrmdhn/simple-to-do-list"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 mr-2"
          >
            <FaGithub className="inline-block mr-1" /> GitHub
          </a>
          <span className="text-gray-600">© 2024 Syahrul Ramadhan. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default App;
