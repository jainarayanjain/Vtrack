// VisitorsPage.js

import React from "react";
import { Link } from "react-router-dom";

import "../../assets/main.css";

const Visitors = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  form-shadow px-30">
      <div className="form-shadow p-10 rounded-2xl space-x-2 w-99 ">
        
        <div className='flex flex-row justify-between gap-28'>
           <h1 className="text-2xl font-bold mb-4 text-blue">Types of Visitors</h1>
          <img src="../images/innova.png" alt="Company Logo" className="h-7  w-auto" />
        </div>

        <div className="flex gap-4 flex-col rounded-2xl ">
          <Link
            to="/visitor/employee"
            className="  bg-sky-600 rounded-xl shadow-lg border-black text-white hover:bg-sky-700  font-bold py-2 px-4 flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Employee
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            className=" bg-sky-600 rounded-xl shadow-lg border-black text-white hover:bg-sky-700   font-bold py-2 px-4 flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Guest
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="//visitor/appointment-visitor"
            className=" bg-sky-600 rounded-xl shadow-lg border-black text-white hover:bg-sky-700   font-bold py-2 px-4 flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Interview
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            className=" bg-sky-600 rounded-xl shadow-lg border-black text-white hover:bg-sky-700   font-bold py-2 px-4 flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            New Hires/ New Joinee
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/service-provider"
            className=" bg-sky-600 rounded-xl shadow-lg border-black text-white hover:bg-sky-700   font-bold py-2 px-4  flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Service Provider
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/employee"
            className=" bg-sky-600 rounded-xl shadow-lg border-black text-white hover:bg-sky-700   font-bold py-2 px-4 flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Employee
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>
          <Link
            to="/visitor/appointment-visitor"
            className=" bg-sky-600 rounded-xl shadow-lg border-black text-white hover:bg-sky-700   font-bold py-2 px-4  flex justify-between hover:shadow-lg transition duration-300 ease-in-out"
          >
            Client
            <span class="material-symbols-outlined">arrow_right_alt</span>
          </Link>

          {/* Add links for other types of visitors */}
        </div>
      </div>
    </div>
  );
};

export default Visitors;
