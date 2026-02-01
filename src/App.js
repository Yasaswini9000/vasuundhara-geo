import React from 'react';
import TodoApp from './components/TodoApp';
import FormTask from './components/FormTask';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';
import SearchList from './components/SearchList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 pb-20">
      <h1 className="text-4xl font-black text-center text-gray-800 mb-10">
        Intern Assignment
      </h1>
      <TodoApp />
      <FormTask/>
      <ProgressBar />
      <Timer />
      <SearchList />
    </div>
  );
}

export default App;