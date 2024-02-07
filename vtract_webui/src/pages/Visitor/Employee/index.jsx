import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAccessCard, useAuth } from "../../../hooks";
import { CancelButton } from "../../../components";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    tempAccessCard: "",
    meetingPerson: "",
  });

  const Auth = useAuth();
  const Access = useAccessCard();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  useEffect(() => {
    Access.getAccessCard();
  }, []);

  const handleCancel = () => {
    Auth.logout();
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
    if (!formData.tempAccessCard.trim() || !/^\d{6}$/.test(formData.tempAccessCard.trim())) {
      newErrors.tempAccessCard = "Temp Access Card must be 6 digits";
    }
    // if (!formData.meetingPerson.trim()) {
    //   newErrors.meetingPerson = "Meeting Person is required";
    // }

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
      tempAccessCard: formData.tempAccessCard,
      // meetingPerson: formData.meetingPerson,
    };

    // Now you can use the 'payload' to send data to your API
    console.log("API Payload:", payload);

    // Navigate to the appropriate page
    navigate("/visitor/host-details"); // Adjust the path accordingly
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle">
      <div className="form-shadow p-10 rounded-2xl">
        <div className="flex flex-row justify-between gap-28">
          <h1 className="text-2xl font-bold mb-6">Employee Details Form</h1>
          <img src="../images/innova.png" alt="Company Logo" className="h-7  w-auto" />
        </div>
        <form className="max-w-md mx-auto rounded-2xl" onSubmit={handleSubmit}>
          {/* Form inputs */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col  md:w-1/2">
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

              <div className="flex flex-col  md:w-1/2">
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
            <div className="flex flex-col">
              <label className="text-gray-700">Phone No.:</label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.phoneNo ? "border-red-500" : ""}`}
              />
              {errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
            </div>
            <div className="flex flex-col ">
              <label className="text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            {/* <div className="flex flex-col mb-10">
              <label className="text-gray-700">Temp Access Card:</label>
              <input
                type="text"
                name="tempAccessCard"
                value={formData.tempAccessCard}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.tempAccessCard ? "border-red-500" : ""}`}
              />
              {errors.tempAccessCard && <p className="text-red-500">{errors.tempAccessCard}</p>}
            </div> */}

            <div className="relative z-0 w-full mb-10 group flex flex-col">
              <label className="text-gray-700">Access Card:</label>
              <select
                name="purposeOfVisit"
                value={formData.tempAccessCard}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.tempAccessCard ? "border-red-500" : ""}`}
              >
                <option value="" disabled>
                  Select purpose
                </option>
                {Access?.access?.map((item) => (
                  <option value={item.visit_purpose} key={item.id}>
                    {item.visit_purpose}{" "}
                  </option>
                ))}
              </select>
              {submitted && errors.tempAccessCard && <p className="text-red-500">{errors.tempAccessCard}</p>}
            </div>
            {/* <div className="flex flex-col mb-10">
              <label className="text-gray-700">Who do you wish to meet:</label>
              <input
                type="text"
                name="meetingPerson"
                value={formData.meetingPerson}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.meetingPerson ? "border-red-500" : ""}`}
              />
              {errors.meetingPerson && <p className="text-red-500">{errors.meetingPerson}</p>}
            </div> */}
          </div>
          <button
            type="submit"
            className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <CancelButton />
      </div>
    </div>
  );
};

export default EmployeeForm;
