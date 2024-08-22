import React, { useState } from "react";

import "../../assets/main.css";
import { CancelButton, NextButton } from "../../components";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import Axios from "../../services/axios";
import { API, Browser } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { toast } from "react-toastify";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({}); // Reset errors when the user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }

    // If there are errors, update the state and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await Axios.get(`${API.V1.ACCOUNT_CHECKOUT}?email=${email}`);
      const data = response.data;
      if (response.status === 200) {
        toast.success("User Logged out, Thanks for Visiting!");
        logout();
        navigate(Browser.HOME);
      }
    } catch (error) {
      console.log("something went wrong", error);
    }

    // If no errors, proceed with form submission or other actions
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen align-middle p-6 ">
        <div className=" bg-white form-shadow p-10 rounded-2xl">
          <div className="flex justify-between gap-28">
            <h1 className="font-bold text-xl mb-6">Checkout</h1>
            <img className="h-7 w-auto md:ml-auto" src="/images/innova.png" alt="company_logo" />
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto rounded-2xl">
            <div className="flex flex-col my-24">
              <label className="text-gray-700 mb-1">Email Address*:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.email ? "border-red-500" : ""}`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="flex gap-4">
              <CancelButton />
              <NextButton
                name={"Submit"}
                icons={<MdOutlineCheckCircleOutline />}
                type={"submit"}
                handleButton={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
