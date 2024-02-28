// src/components/Page.js
import React from "react";
import { GiExitDoor, GiEntryDoor } from "react-icons/gi";
import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 gap-2 font-roboto border-2 border-black">
      <div className=" p-10 form-shadow rounded-xl md:flex-row ">
        <div className="flex flex-row justify-end">
          <img src="images/innova.png" alt="Company Logo" className="h-10 w-auto mb-5 ml-86" />
        </div>
        <div className="mb flex flex-col mt-10">
          <h1 className="text-3xl font-extrabold mb-10 ">
            Welcome to <span className="text-sky-600">Innova Solutions</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <a href="/checkin" className="flex flex-col items-center space-x-2">
            <div className="bg-[#20b2aa] hover:bg-[#49aea9] border  p-4 flex items-center  rounded-xl ">
              <div className="border-white  p-3 text-white">
                <i className="font-size">
                  <HiOutlineLogin />
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
              <div className="border-white  p-3 text-white ">
                <i className="font-size">
                  <HiOutlineLogout />
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
