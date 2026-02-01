import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks'));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, completed: false, priority };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Task 1: Todo App</h2>
      
      <form onSubmit={addTask} className="space-y-3 mb-6">
        <input 
          className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="What needs to be done?"
        />
        <div className="flex gap-2">
          <select className="border-2 p-2 rounded-lg bg-gray-50 cursor-pointer" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex-1">Add Task</button>
        </div>
      </form>

      <div className="flex justify-center gap-2 mb-6">
        {['All', 'Active', 'Completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1 text-sm rounded-full transition ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{f}</button>
        ))}
      </div>

      <ul className="space-y-3">
        {filteredTasks.map(t => (
          <li key={t.id} className={`flex justify-between items-center p-3 border rounded-lg ${t.priority === 'High' ? 'bg-red-50' : 'bg-white'}`}>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5" checked={t.completed} onChange={() => setTasks(tasks.map(task => task.id === t.id ? {...task, completed: !task.completed} : task))} />
              <span className={t.completed ? 'line-through text-gray-400' : 'font-medium'}>{t.text}</span>
              <span className="text-[10px] uppercase font-bold px-2 py-1 bg-gray-200 rounded text-gray-600">{t.priority}</span>
            </div>
            <button onClick={() => setTasks(tasks.filter(task => task.id !== t.id))} className="text-red-500 hover:scale-110 transition">🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;