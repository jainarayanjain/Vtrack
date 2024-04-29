import React from "react";
import { useAppSelector } from "../../hooks";
import { NextButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { Browser } from "../../constants";

function IdCard() {
  const userMedia = useAppSelector((state) => state.media);
  const visitorData = useAppSelector((state) => state.visitor);
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    // Handle logic for the Home button click
    navigate(Browser.HOME);
  };

  const handlePrintButtonClick = () => {
    // Handle logic for the Print button click
    console.log("Print button clicked");
    navigate("/");
  };

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  function getCurrentTimestamp() {
    // Create a new Date object to get the current date and time
    var currentDate = new Date();

    // Extract individual components of the date and time
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Month starts from 0, so add 1 to get the actual month
    var year = currentDate.getFullYear();

    // Ensure day and month are formatted with leading zeros if necessary
    day = (day < 10 ? "0" : "") + day;
    month = (month < 10 ? "0" : "") + month;

    // Extract hours, minutes, and seconds
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // Format hours, minutes, and seconds with leading zeros if necessary
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Construct the timestamp string
    var timestamp = day + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds;

    // Return the timestamp
    return timestamp;
  }

  // Call the function to get the current timestamp and log it
  console.log(getCurrentTimestamp());

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2 md:p-20 xl:p-8 ">
      <div className="flex flex-row form-shadow rounded-xl  items-center  h-auto w-full  lg:w-9/12 xl:w-2/5">
        <div
          className="rotate-180 h-60 md:h-80 flex items-center px-2 justify-center rounded-r-xl bg-black text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          <p className=" bg-black text-white text-base md:text-2xl">
            {capitalizeWords(visitorData.visitorData.visitorType)}
          </p>
        </div>
        <div className="w-full p-4 h-full">
          <div className="flex flex-row justify-between  w-full mb-6">
            <div>
              <h2 className="text-xs md:text-xl font-bold text-black-600">Innova Solutions Tech. Pvt. Ltd.</h2>
              <p className="text-xs md:text-lg">Innova Solutions Noida</p>
            </div>
            <img src="./images/innova.png" alt="Company Logo" className="h-6 md:h-9  w-auto" />
          </div>
          <div className="flex flex-row items-center ">
            <img src={userMedia.userData.userPhoto} alt="" className="w-32 md:w-48" />
            <div className="ml-5">
              <h1 className="text-lg md:text-xl font-semibold  text-black-600 ">
                {visitorData.visitorData.visitorName}
              </h1>
              {/* <p className="text-sm md:text-lg font-semibold  text-black-600">103795</p> */}
              {/* <p className="text-sm md:text-lg font-semibold  text-black-600">20/03/2024 - 12:06:05</p> */}
              <p className="text-sm md:text-lg font-semibold  text-black-600">{getCurrentTimestamp()}</p>
              <p className="test-sm md:text-lg font-semibold  text-black-600">
                Host: <span className="test-xs md:text-lg text-black-400">{visitorData.HostData?.hostName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleHomeButtonClick}
        >
          Home
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrintButtonClick}
        >
          Print
        </button>
      </div>
    </div>
  );
}

export default IdCard;
