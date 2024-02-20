import React, { useState, useEffect } from "react";
import "../../assets/confetti.css";
import { Confetti } from "../../components";
import Lottie from "lottie-react";
import animation from "../../assets/waiting.json";

const ApprovalPage = () => {
  const [isApproved, setIsApproved] = useState(true);
  const [responseReceived, setResponseReceived] = useState(false);

  // Function to make the API call for approval status
  const checkApprovalStatus = async () => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT");
      const data = await response.json();
      setIsApproved(data.isApproved);

      // Stop polling if response is received
      if (data.isApproved !== null) {
        setResponseReceived(true);
      }
    } catch (error) {
      console.error("Error checking approval status:", error);
    }
  };

  useEffect(() => {
    // Initial API call on component mount
    checkApprovalStatus();

    // Polling every 20 seconds until response is received
    const intervalId = setInterval(() => {
      if (!responseReceived) {
        checkApprovalStatus();
      }
    }, 10000);

    // Cleanup interval on component unmount or when response is received
    return () => clearInterval(intervalId);
  }, [responseReceived]);

  return (
    <div className=" mx-auto  h-screen overflow-y-auto flex flex-col justify-center items-center">
      {isApproved === null ? (
        <>
          <div className="mx-auto md:w-1/3 w-full mb-6 md:mb-0">
            <Lottie animationData={animation} />
          </div>

          <div className="mt-10 flex flex-col justify-center items-center text-center">
            <h1>Waiting for Approval</h1>
            <p>Please wait while we process your request.</p>
          </div>
        </>
      ) : isApproved ? (
        <>
          <Confetti />
          <div className="checkmark-circle">
            <div className="background"></div>
            <div className="checkmark draw"></div>
          </div>
          <h1 className="mt-10">Congratulations!</h1>
          <p>You are all set. Well done!</p>
          <button
            className="submit-btn mt-4"
            type="submit"
            onClick={() => alert("😀😀😁😊☺🙂\n Yes, I got the Entry!!!!!!!")}
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <h1 className="mt-10">Regret</h1>
          <p>We're sorry, but your request was not approved.</p>
          <button className="submit-btn mt-4" type="submit" onClick={() => alert("🥺🥺🥺🥺🥺\n You can try again.")}>
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default ApprovalPage;
