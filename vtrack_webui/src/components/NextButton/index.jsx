import React from "react";

const NextButton = ({ name, handleButton, icons, type }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
        <button
          className=" flex gap-1 bg-green-500 hover:bg-green-700 text-sm w-full  text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline items-center justify-center md:ml-auto"
          type={type ? type : "button"}
          onClick={handleButton}
        >
          {name}
          <i className="text-lg">{icons}</i>
        </button>
      </div>
    </>
  );
};

export default NextButton;
