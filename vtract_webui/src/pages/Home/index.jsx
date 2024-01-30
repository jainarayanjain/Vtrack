// src/components/Page.js
import React from "react";
import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 font-roboto">
      <div className="mb-5">
        <img src="images/innova.png" alt="Company Logo" className="h-20  w-auto" />
      </div>
      <div className="mb-12">
        <h1 className="text-sm">Welcome to Innova solutions</h1>
      </div>
      <div className="flex flex-row items-center gap-5 ">
        <a href="/checkin" className="flex flex-col   items-center space-x-2">
          

          <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"><div className="flex flex-row items-center justify-center gap-2"> <HiOutlineLogin style={{fontSize: "22px", fontWeight:"600"}} /> <span>Check In</span></div></button>
        </a>
        <a href="/checkout" className="flex flex-col items-center space-x-2">
        <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"><div className="flex flex-row items-center justify-center gap-2"> <HiOutlineLogout style={{fontSize: "22px", fontWeight:"600"}} /> <span>Check Out</span></div></button>
        </a>
        {/* <a href="#" className="flex flex-col items-center space-x-2">
          <div className="bg-yellow-200 hover:bg-yellow-400 border rounded-full mb-4 p-4">
            <img src="images/qr-code-scan.png" alt="Scan QR Code Logo" className="h-8 w-8  " />
          </div>
          <button className=" hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded">Scan QR Code</button>
        </a> */}
      </div>
    </div>
  );
};

export default Home;
