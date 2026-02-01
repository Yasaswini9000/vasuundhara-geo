import React, { useState } from 'react';

const ProgressBar = () => {
  const [inputs, setInputs] = useState([0, 0, 0]);

  const handleInputChange = (index, value) => {
    let val = parseInt(value) || 0;
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    
    const newInputs = [...inputs];
    newInputs[index] = val;
    setInputs(newInputs);
  };

  const average = inputs.reduce((a, b) => a + b, 0) / inputs.length;

  const getColor = (val) => {
    if (val < 40) return '#ef4444'; // Red
    if (val > 70) return '#22c55e'; // Green
    return '#eab308'; // Yellow
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-2xl rounded-xl">
      <h2 className="text-center font-bold text-xl mb-4">Task 3: Dynamic Progress Bar</h2>
      
      {/* Main Progress Bar */}
      <div style={{ background: '#e5e7eb', borderRadius: '10px', height: '20px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ 
          width: `${average}%`, 
          height: '100%', 
          backgroundColor: getColor(average),
          transition: 'width 0.5s ease-in-out' 
        }}></div>
      </div>
      <p className="text-center font-bold mb-6">Total Progress: {Math.round(average)}%</p>

      {/* Individual Inputs and Sub-bars */}
      <div className="space-y-4">
        {inputs.map((val, idx) => (
          <div key={idx} style={{ marginBottom: '15px' }}>
            <label>Input {idx + 1} (%)</label>
            <input 
              type="number" 
              value={val} 
              onChange={(e) => handleInputChange(idx, e.target.value)}
              className="border p-1 w-full"
            />
            <div style={{ background: '#f3f4f6', borderRadius: '5px', height: '10px', marginTop: '5px' }}>
              <div style={{ 
                width: `${val}%`, 
                height: '100%', 
                backgroundColor: getColor(val),
                borderRadius: '5px',
                transition: 'width 0.3s'
              }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;