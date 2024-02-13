// src/components/HostDetailsForm.js

import React, { useState } from 'react';

const HostDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const { name, email, phone } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    // Clear the error message when the user starts typing again
    setErrors({
      ...errors,
      [e.target.id]: '',
    });
  };

  const validateEmail = () => {
    // Add your custom email validation logic here
    const validSuffixes = ['innovasolutions.com', 'acsicorp.com'];

    for (const suffix of validSuffixes) {
      if (email.endsWith(suffix)) {
        return true;
      }
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Basic validation for the required fields
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    // Additional validation for email suffix
    if (!validateEmail()) {
      newErrors.email = 'Invalid email address. Please use a valid company email.';
    }

    // If there are errors, update the state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed to handle the form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
  };

  return (
    <div className="max-w-md  mx-auto mt-8 p-4 rounded-lg shadow-md bg-white">

        <div><h1 className='font-bold text-xl mb-6'>Host Detail Form</h1></div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name of the person you wish to meet.
          </label>
          <input
            type="text"
            id="name"
            className={`w-full p-2 border border-gray-300 rounded-md ${errors.name ? 'border-red-500' : ''}`}
            value={name}
            onChange={handleChange}
            placeholder="Enter name of the person"
            required
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address of the person.
          </label>
          <input
            type="email"
            id="email"
            className={`w-full p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
            value={email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number.
          </label>
          <input
            type="tel"
            id="phone"
            className={`w-full p-2 border border-gray-300 rounded-md ${errors.phone ? 'border-red-500' : ''}`}
            value={phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        <a href='/'
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Cancel
        </a>
      </form>
    </div>
  );
};

export default HostDetailsForm;
