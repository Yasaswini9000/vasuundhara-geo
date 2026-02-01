import React, { useState } from 'react';

const FormTask = () => {
  // Form fields state
  const [formData, setFormData] = useState({ name: '', email: '', id: '', password: '' });
  // Validation errors state
  const [errors, setErrors] = useState({});
  // Submitted data display state
  const [submittedData, setSubmittedData] = useState(null);
  // Password toggle state
  const [showPassword, setShowPassword] = useState(false);

  // Email Validation Logic
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 1. Prevent page reload
    
    let tempErrors = {};
    // 4. Basic Validation: All fields are required
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.id.trim()) tempErrors.id = "ID is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = "Email must be valid (e.g., user@example.com)";
    }

    setErrors(tempErrors);

    // If no errors, submit the form
    if (Object.keys(tempErrors).length === 0) {
      setSubmittedData(formData); // 2. Capture and display data
      setFormData({ name: '', email: '', id: '', password: '' }); // Clear form after submission
      setErrors({});
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Task 2: Form Handling</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none" 
            placeholder="Enter Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none" 
            placeholder="Enter Email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
        </div>

        {/* ID Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none" 
            placeholder="Enter ID" 
            value={formData.id} 
            onChange={(e) => setFormData({...formData, id: e.target.value})} 
          />
          {errors.id && <p className="text-red-500 text-xs mt-1 font-bold">{errors.id}</p>}
        </div>

        {/* Password Field with Toggle */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none" 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter Password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            {/* 3. Show / Hide Password Button */}
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-2 top-2 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1 font-bold">{errors.password}</p>}
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-bold transition duration-300">
          SUBMIT FORM
        </button>
      </form>

      {/* Submitted Data Display */}
      {submittedData && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg border-2 border-green-200">
          <h3 className="font-bold border-b border-green-200 mb-3 text-green-800 text-center">✅ Submitted Data</h3>
          <div className="space-y-1 text-sm text-gray-700">
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>ID:</strong> {submittedData.id}</p>
            <p><strong>Password:</strong> {submittedData.password} <span className="text-[10px] text-gray-400">(Capturing for demo)</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormTask;