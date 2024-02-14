import React from "react";
import { useAuth } from "../../hooks";

const CancelButton = () => {
  const Auth = useAuth();
  const handleCancel = () => {
    Auth.logout();
  };

  return (
    <>
      <button
        onClick={handleCancel}
        className="mx-auto  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded text-sm w-full px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        Cancel
      </button>
    </>
  );
};

export default CancelButton;
