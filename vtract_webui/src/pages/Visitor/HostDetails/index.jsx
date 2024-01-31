// src/components/HostDetailsForm.js

import React, { useState } from 'react';

const HostDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const { name, email, phone } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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

    if (!validateEmail()) {
      alert('Invalid email suffix. Please use a valid company email.');
      return;
    }

    // You can handle the form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
  };

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HostDetailsForm;
