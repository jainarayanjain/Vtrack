import React, { useState, useEffect } from "react";
import "../../assets/confetti.css";
import { Confetti } from "../../components";
import Lottie from "lottie-react";
import animation from "../../assets/waiting.json";
import { useAppSelector } from "../../hooks";
import Axios from "../../services/axios";
import { API, Browser } from "../../constants";
import IdCard from "../../components/IdCard";
import { useNavigate } from "react-router-dom";

const ApprovalPage = () => {
  const userData = useAppSelector((state) => state.auth);
  const approvalData = useAppSelector((state) => state.visitor);

  const [isApproved, setIsApproved] = useState(userData.isApproved);
  const [responseReceived, setResponseReceived] = useState(false);

  const navigate = useNavigate();


  // Function to make the API call for approval status
  const checkApprovalStatus = async () => {
    try {
      // const response = await Axios.get(`${API.V1.VISITOR_APPROVALS}${approvalData.ApprovalId}`);
      // const data = await response.json();
      // setIsApproved(data.is_approved);

      // // Stop polling if response is received
      // if (data.is_approved === true) {
      //   setResponseReceived(true);
      // }
      // if (response.status == 200) {
      // }
      // const currentDate = new Date();
      // const isoTimestamp = currentDate.toISOString();

      // const timingPayload = {
      //   approval: approvalData.ApprovalId,
      //   check_in: isoTimestamp,
      // };
      // const response = await Axios.post(API.V1.TIMING_DETAILS, timingPayload);
      // if (response.status === 201) {
      //   // navigate(Browser.APPROVAL);
      //   setIsApproved(true);
      // }

      return data.is_approved;
    } catch (error) {
      console.error("Error checking approval status:", error);
    }
  };

  useEffect(() => {
    // Initial API call on component mount
    // const is_approved = checkApprovalStatus();
    // is_approved.then((data) => console.log(data));
    // setIsApproved(is_approved);

    // // Polling every 20 seconds until response is received
    // const intervalId = setInterval(() => {
    //   if (!responseReceived) {
    //     checkApprovalStatus();
    //   }
    // }, 10000);

    // // Cleanup interval on component unmount or when response is received
    // return () => clearInterval(intervalId);
    checkApprovalStatus();
  }, []);

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
          <h1 className="mt-10 text-2xl">Congratulations!</h1>
          <p className="text-sm">You are all set. Well done!</p>
          {/* <IdCard /> */}
          <button
            className="submit-btn mt-4"
            type="submit"
            onClick={isApproved ? () => navigate(Browser.IDCARD) : alert("something went wrong")}
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
