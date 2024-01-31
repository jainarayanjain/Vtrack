import React, { useState } from "react";
import "../../../assets/main.css";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    tempAccessCard: "",
    meetingPerson: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    if (submitted) {
      setErrors({ ...errors, [e.target.name]: "" });

      // Additional validations
      switch (e.target.name) {
        case "email":
          validateEmail(e.target.value);
          break;
        case "phoneNo":
          validatePhoneNumber(e.target.value);
          break;
        case "tempAccessCard":
          validateTempAccessCard(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: "Invalid email address" });
    }
  };

  const validatePhoneNumber = (phoneNo) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNo)) {
      setErrors({ ...errors, phoneNo: "Phone number must be 10 digits" });
    }
  };

  const validateTempAccessCard = (tempAccessCard) => {
    const tempAccessCardRegex = /^\d{6}$/;
    if (!tempAccessCardRegex.test(tempAccessCard)) {
      setErrors({ ...errors, tempAccessCard: "Temp Access Card must be 6 digits" });
    }
  };

  const handleSubmit = () => {
    // Basic validation
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone No. is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.tempAccessCard.trim()) {
      newErrors.tempAccessCard = "Temp Access Card is required";
    }
    if (!formData.meetingPerson.trim()) {
      newErrors.meetingPerson = "Meeting Person is required";
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(true);
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNo: formData.phoneNo,
      email: formData.email,
      tempAccessCard: formData.tempAccessCard,
      meetingPerson: formData.meetingPerson,
    };

    console.log("API Payload:", payload);
  };

  return (
    <div className="flex flex-col items-center justify-center align-middle h-screen">
      <form className="form-shadow p-10 rounded-2xl" onSubmit={handleSubmit}>
        <div className='flex flex-row justify-between gap-28'>
          <h1 className="text-2xl font-bold mb-4">Employee Details Form</h1>
          <img src="../images/innova.png" alt="Company Logo" className="h-7  w-auto" />
        </div>

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
          <div className="flex flex-col">
            <label className="text-gray-700">Temp Access Card:</label>
            <input
              type="text"
              name="tempAccessCard"
              value={formData.tempAccessCard}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.tempAccessCard ? "border-red-500" : ""}`}
            />
            {errors.tempAccessCard && <p className="text-red-500">{errors.tempAccessCard}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Who do you wish to meet:</label>
            <input
              type="text"
              name="meetingPerson"
              value={formData.meetingPerson}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.meetingPerson ? "border-red-500" : ""}`}
            />
            {errors.meetingPerson && <p className="text-red-500">{errors.meetingPerson}</p>}
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
