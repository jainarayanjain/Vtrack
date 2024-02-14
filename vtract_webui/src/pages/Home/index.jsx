// src/components/Page.js
import React from "react";
import { GiExitDoor, GiEntryDoor } from "react-icons/gi";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 font-roboto border-2 border-black">
      <div className=" p-16 form-shadow rounded-xl md:flex-row">
        <div className="mb-14 flex flex-col items-center">
          <img src="images/innova.png" alt="Company Logo" className="h-20 w-auto mb-5" />
          <h1 className="text-sm ml-3">Welcome to Innova solutions</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <a href="/checkin" className="flex flex-col items-center space-x-2">
            <div className="bg-[#c280ff] hover:bg-[#b87df0] border  p-4 flex items-center  rounded-xl ">
              <div className="border-white border-2 rounded-full p-4 bg-gray-300 text-gray-700">
                <i className="font-size">
                  <GiExitDoor />
                </i>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-2xl font-bold ml-2 mb-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                  Check In
                </span>
                <span className="text-white  font-bold ml-2">Entering the premises?</span>
              </div>
            </div>
          </a>
          <a href="/checkout" className="flex flex-col items-center space-x-2">
            <div className="bg-[#3E8EDE]  hover:bg-[#45a0fb] border rounded-xl p-4 flex items-center">
              <div className="border-white border-2 rounded-full p-4 bg-gray-300 ">
                <i className="font-size">
                  <GiEntryDoor />
                </i>
              </div>
              <div className="flex flex-col">
                <span className="text-white  text-2xl font-bold ml-2 mb-1">Check Out</span>
                <span className="text-white font-bold ml-2">Leaving the premises?</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
