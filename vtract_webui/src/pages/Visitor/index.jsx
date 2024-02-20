// VisitorsPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/main.css";
import { useAppDispatch } from "../../hooks";
import { setVisitorType } from "../../features/VisitorSlice";

const Visitors = () => {
  const dispatch= useAppDispatch();

  const handleVisitorType = (visitorType) => {
    const payload={
      visitorType,
      visitorId:null
    }
    dispatch(setVisitorType(payload));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle form-shadow">
      <div className="form-shadow p-10 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Types of Visitors</h1>

        <div className="flex gap-4 flex-col">
          <Link
            to="/visitor/employee"
            onClick={() => handleVisitorType("employee")}
            className=" border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Employee
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("appointment-visitor")}
            className="border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Guest
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("interview")}
            className="border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Interview
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("appointment-visitor")}
            className="border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            New Hires/ New Joinee
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/service-provider"
            onClick={() => handleVisitorType("service provider")}
            className="border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Service Provider
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("appointment-visitor")}
            className="border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Visitor
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("appointment-visitor")}
            className="border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Client
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Visitors;
