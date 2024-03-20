// VisitorsPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/main.css";
import { useAppDispatch } from "../../hooks";
import { setVisitorType } from "../../features/VisitorSlice";

const Visitors = () => {
  const dispatch = useAppDispatch();

  const handleVisitorType = (visitorType) => {
    const payload = {
      visitorType,
      visitorId: null,
    };
    console.log(visitorType,"VISITORTYPEDATA-->")
    dispatch(setVisitorType({visitorType: visitorType }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle form-shadow ">
      <div className="flex flex-col justify-center form-shadow p-10 rounded-xl h-full  md:max-h-full w-full md:w-5/6 lg:w-2/4 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4  ">Types of Visitors</h1>

        <div className="flex gap-8 flex-col sm:gap-4">
          <Link
            to="/visitor/employee"
            onClick={() => handleVisitorType("employee")}
            className="md:h-16 h-12 md:text-2xl  text-xl items-center border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Employee
            <span className="material-symbols-outlined md:text-5xl text-3xl">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("guest")}
            className="md:h-16 h-12 text-xl md:text-2xl items-center border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Guest
            <span class="material-symbols-outlined md:text-5xl text-3xl">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("interview")}
            className="md:h-16 md:text-2xl h-12 text-xl items-center border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Interview
            <span class="material-symbols-outlined md:text-5xl text-3xl">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("new")}
            className="md:h-16 md:text-2xl h-12 text-xl items-center border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            New Hires/ New Joinee
            <span class="material-symbols-outlined md:text-5xl text-3xl">arrow_right_alt</span>
          </Link>
          <Link
            to="/service-provider"
            onClick={() => handleVisitorType("service provider")}
            className="md:h-16 md:text-2xl h-12 text-xl items-center border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Service Provider
            <span class="material-symbols-outlined md:text-5xl text-3xl">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("Visitor")}
            className="md:h-16 md:text-2xl h-12 text-xl items-center border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Visitor
            <span class="material-symbols-outlined md:text-5xl text-3xl">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            onClick={() => handleVisitorType("client")}
            className="md:h-16 md:text-2xl h-12 text-xl items-center border border-black text-black hover:bg-gray-200  font-bold py-2 px-4 rounded flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Client
            <span class="material-symbols-outlined md:text-5xl text-3xl">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Visitors;
