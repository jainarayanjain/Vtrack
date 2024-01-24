import React, { useState } from "react";

import "../../../assets/main.css";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    purposeOfVisit: "",
    meetingPerson: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Basic validation
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.phoneNo.trim() || !/^\d{10}$/.test(formData.phoneNo.trim())) {
      newErrors.phoneNo = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.purposeOfVisit.trim()) {
      newErrors.purposeOfVisit = "Purpose of Visit is required";
    }
    if (!formData.meetingPerson.trim()) {
      newErrors.meetingPerson = "Meeting Person is required";
    }

    // If there are errors, update the state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed to create a payload for the API
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNo: formData.phoneNo,
      email: formData.email,
      purposeOfVisit: formData.purposeOfVisit,
      meetingPerson: formData.meetingPerson,
    };

    // Now you can use the 'payload' to send data to your API
    console.log("API Payload:", payload);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle">
      <div className="form-shadow p-10 rounded-2xl">
        <h1 className="text-2xl font-bold mb-6">Visitor Details Form</h1>

        <form className="max-w-md mx-auto rounded-2xl" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="text-gray-700">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.firstName ? "border-red-500" : ""}`}
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>

            <div className="flex flex-col mb-4 md:w-1/2">
              <label className="text-gray-700">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.lastName ? "border-red-500" : ""}`}
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div className="relative flex flex-col z-0 w-full mb-5 group">
            <label className="text-gray-700">Phone Number:</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.phoneNo ? "border-red-500" : ""}`}
            />
            {submitted && errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
          </div>

          <div className="relative flex flex-col z-0 w-full mb-5 group">
            <label className="text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.email ? "border-red-500" : ""}`}
            />
            {submitted && errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="relative flex flex-col z-0 w-full mb-5 group">
            <label className="text-gray-700">Purpose of Visit:</label>
            <select
              name="purposeOfVisit"
              value={formData.purposeOfVisit}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.purposeOfVisit ? "border-red-500" : ""}`}
            >
              <option value="" disabled>
                Select purpose
              </option>
              <option value="Interview">Interview</option>
              <option value="New Hires/Joinees">New Hires/Joinees</option>
              <option value="Visitor">Visitor</option>
              <option value="Guest">Guest</option>
              <option value="Client">Client</option>
            </select>
            {submitted && errors.purposeOfVisit && <p className="text-red-500">{errors.purposeOfVisit}</p>}
          </div>

          <div className="relative flex flex-col z-0 w-full mb-5 group">
            <label className="text-gray-700">Who do you wish to meet:</label>
            <input
              type="text"
              name="meetingPerson"
              value={formData.meetingPerson}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.meetingPerson ? "border-red-500" : ""}`}
            />
            {submitted && errors.meetingPerson && <p className="text-red-500">{errors.meetingPerson}</p>}
          </div>

          <button
            type="submit"
            className=" mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
