import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [targetTime, setTargetTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10000); // 10 seconds in ms
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [inputValue, setInputValue] = useState(10);
  const timerRef = useRef(null);

  // Persistence: Load from localStorage on mount
  useEffect(() => {
    const savedTarget = localStorage.getItem('timer_target');
    const savedStatus = localStorage.getItem('timer_status');
    if (savedTarget && savedStatus === "Running") {
      setTargetTime(parseInt(savedTarget));
      setIsRunning(true);
      setStatus("Running");
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, targetTime - now);
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setStatus("Completed");
          localStorage.removeItem('timer_target');
          localStorage.setItem('timer_status', 'Completed');
        }
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, targetTime]);

  const handleStart = () => {
    const target = Date.now() + inputValue * 1000;
    setTargetTime(target);
    setTimeLeft(inputValue * 1000);
    setIsRunning(true);
    setStatus("Running");
    localStorage.setItem('timer_target', target);
    localStorage.setItem('timer_status', 'Running');
  };

  const handlePause = () => {
    setIsRunning(false);
    setStatus("Paused");
    localStorage.setItem('timer_status', 'Paused');
  };

  const handleResume = () => {
    const newTarget = Date.now() + timeLeft;
    setTargetTime(newTarget);
    setIsRunning(true);
    setStatus("Running");
    localStorage.setItem('timer_target', newTarget);
    localStorage.setItem('timer_status', 'Running');
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(10000);
    setInputValue(10);
    setStatus("Ready");
    localStorage.clear();
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-2xl rounded-xl border border-blue-100">
      <h2 className="text-center font-bold text-xl mb-4 text-blue-700">Task 4: Countdown Timer</h2>
      
      <div className="text-center text-4xl font-mono mb-4 text-gray-800">
        {status === "Completed" ? <span className="text-red-500">Time's up!</span> : formatTime(timeLeft)}
      </div>
      
      <p className="text-center font-bold mb-4 italic text-gray-500">Status: {status}</p>

      <div className="flex flex-col gap-4">
        <input 
          type="number" 
          disabled={isRunning}
          value={inputValue}
          onChange={(e) => setInputValue(Math.max(0, parseInt(e.target.value) || 0))}
          className="p-2 border rounded text-center"
          placeholder="Set seconds"
        />

        <div className="flex justify-center gap-2">
          {status !== "Completed" && !isRunning && status !== "Paused" && (
            <button onClick={handleStart} className="bg-green-500 text-white px-4 py-2 rounded">Start</button>
          )}
          {isRunning && (
            <button onClick={handlePause} className="bg-yellow-500 text-white px-4 py-2 rounded">Pause</button>
          )}
          {status === "Paused" && (
            <button onClick={handleResume} className="bg-blue-500 text-white px-4 py-2 rounded">Resume</button>
          )}
          <button onClick={handleReset} className="bg-red-500 text-white px-4 py-2 rounded">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;