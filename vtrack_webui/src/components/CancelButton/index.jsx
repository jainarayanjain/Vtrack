import React from "react";
import { useAuth } from "../../hooks";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Browser } from "../../constants";


const CancelButton = () => {
  const navigate=useNavigate();
  const Auth = useAuth();
  const handleCancel = () => {
    navigate(Browser.HOME)
    Auth.logout();
  };

  return (
    <>
      <button
        onClick={handleCancel}
        className=" flex  items-center justify-center gap-1 mx-auto  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Cancel
        <span className="text-lg flex align-middle  ">
          <MdOutlineCancel />
        </span>
      </button>
    </>
  );
};

export default CancelButton;
