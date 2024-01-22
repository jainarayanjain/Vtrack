import React, { useState } from "react";

import '../../assets/main.css'

const Checkout = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
    setErrors({}); // Reset errors when the user starts typing
  };

  const handleSubmit = () => {
    // Basic validation
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    // If there are errors, update the state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed with form submission or other actions
    console.log("Phone Number:", phoneNumber);
  };

  return (
    <div className="flex flex-col  items-center justify-center h-screen  ">
      <div className=" form-shadow p-20 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 ">Checkout</h1>

        <div className="flex flex-col my-52">
          <label className="text-gray-700">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className={`border rounded-md p-2 ${errors.phoneNumber ? "border-red-500" : ""}`}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded mt-4"
          onClick={handleSubmit}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
