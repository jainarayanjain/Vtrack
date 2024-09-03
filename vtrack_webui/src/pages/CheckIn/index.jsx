// src/components/CheckInPage.js
import React, { useState, useEffect } from "react";
import "../../assets/main.css";
import { API, LOCAL_STORAGE_KEY } from "../../constants";
import Axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import { setLoggedIn } from "../../features/authSlice";
import { setVisitorType } from "../../features/VisitorSlice";
import { useSelector } from "react-redux";
import { NextButton, StepProgressBar } from "../../components";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";

const CheckIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(20); // Initial countdown time in seconds
  const [responseReceived, setResponseReceived] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth);
  const visitorTypeData = useSelector((state) => state.visitor);

  const handleEmailChange = (e) => {
    const input = e.target.value.trim(); // Trim whitespace
    setEmail(input);

    // Simple email validation (replace with a more robust solution if needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleOtpChange = (e) => {
    // const input = e.target.value.replace(/\D/g, ""); // Allow only digits
    setOtp(e.target.value);

    // if (!input) {
    //   setOtpError("OTP is required.");
    // } else {
    //   setOtpError("");
    // }
  };
  const Email_Payload = {
    email,
  };
  const OTP_Payload = {
    otp,
    // visitor: visitorTypeData.visitorData.visitorId,
  };

  const handleSendOtp = async () => {
    try {
      const response = await Axios.post(API.V1.VISITOR_DETAILS, Email_Payload);
      const data = response.data;
      if (response.status === 401) {
        toast.error("something went wrong while sending OTP");
      }
      const AccessToken = response.data.token;
      if (response.status === 201) {
        const payload = {
          visitorId: data.id,
        };
        toast.success("OTP sent successfully! check your mail");
        setResponseReceived(true);
        dispatch(setLoggedIn({ isLoggedIn: true, userId: response.data.id }));
        setTimeout(() => {
          setIsButtonDisabled(true); // Disable the button after sending OTP
          setIsOtpSent(true);
          setCountdown(20); // Reset the countdown
        }, 1000);
        dispatch(setVisitorType(payload));
      }
    } catch (error) {
      console.log(error, "something went wrong while logging in");
    }
  };

  const handleCheckIn = () => {
  
    Axios.patch(`${API.V1.VISITOR_VALIDS}${visitorTypeData.visitorData.visitorId}/`, OTP_Payload)
      .then(response => {
        console.log(response, "this is response--->");
  
        if (response.status === 400) {
          toast.error("Validation failed. Please fix errors");
        } else if (response.status === 200) {
          const data = response.data;
          console.log(data, "this is data ");
          navigate("/checkin/photo-interaction");
        }
      })
      .catch(error => {
        toast.error("Invalid OTP");
        console.error("Error in Axios request:", error);
        console.log("something went wrong while logging in");
      });
  };
  

  useEffect(() => {
    let timer;

    if (isButtonDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            setIsButtonDisabled(false); // Enable the button after the countdown
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [isButtonDisabled]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <div className="flex flex-col form-shadow rounded-2xl p-6 items-center justify-center max-w-screen-md gap-x-5 mx-auto w-full h-full">
        <img src="./images/vtrack-login.jpg" className="w-full md:w-full lg:w-9/12 xl:w-3/6 h-2/5" alt="login_image" />

        <form className="w-full max-w-lg md:w-full lg:w-xl h-1/2">
          <div className="flex flex-col justify-between items-center mb-4">
            <h1 className="mb-8 text-xl font-bold">CheckIn</h1>
            <img src="images/innova.png" alt="Company Logo" className="h-7 w-auto md:ml-auto" />
          </div>
          <div className="mb-1">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold ">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Enter your email address"
            />
            {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
          </div>

          <div className="mb-2">
            <button
              className={`${
                isButtonDisabled
                  ? "text-gray-700 cursor-not-allowed text-sm"
                  : "text-blue-700 hover:underline focus:outline-none text-sm"
              }`}
              type="button"
              onClick={handleSendOtp}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? `Resend OTP in ${countdown}s` : "Send OTP"}
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold">
              OTP*
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              // disabled={visitorTypeData.visitorData.visitorId!=null? false: true}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                otpError ? "border-red-500" : ""
              }`}
              placeholder="Enter OTP"
            />
            {otpError && <p className="text-red-500 text-xs italic mt-1">{otpError}</p>}
          </div>
          <div className="flex flex-col items-center justify-between w-full">
            <NextButton name={"Check-in"} handleButton={handleCheckIn} icons={<MdOutlineCheckCircleOutline />} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckIn;
