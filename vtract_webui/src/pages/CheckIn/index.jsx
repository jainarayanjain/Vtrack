// src/components/CheckInPage.js
import React, { useState, useEffect } from "react";
import "../../assets/main.css";
import { API, LOCAL_STORAGE_KEY } from "../../constants";
import Axios from "../../services/axios";
import {useNavigate} from 'react-router-dom'
import { useAppSelector, useAppDispatch} from "../../hooks/index"
import { selectIsLoggedIn, setLoggedIn } from "../../features/authSlice";

const CheckIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(20); // Initial countdown time in seconds

  const navigate = useNavigate();
  const dispatch =useAppDispatch();
  const selector=useAppSelector(selectIsLoggedIn);

  useEffect(()=>{
    if(selector || localStorage.getItem(LOCAL_STORAGE_KEY)!=undefined){
      navigate("/checkin/photo-interaction")
    }
  },[])


  const handleEmailChange = (e) => {
    const input = e.target.value.trim(); // Trim whitespace
    setEmail(input);

    // Simple email validation (replace with a more robust solution if needed)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(input)) {
    //   setEmailError('Please enter a valid email address.');
    // } else {
    //   setEmailError('');
    // }
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

  const handleSendOtp = () => {
    // Simulating OTP sending with a timeout (replace with actual API call)
    setTimeout(() => {
      setIsOtpSent(true);
      setIsButtonDisabled(true); // Disable the button after sending OTP
      setCountdown(20); // Reset the countdown
    }, 2000);
  };

  const handleCheckIn = async () => {
    if (emailError || otpError) {
      console.log("Validation failed. Please fix errors.");
      return;
    }
    console.log("Checking in:", { email, otp });

    const loginPayload = {
      username: email,
      password: otp,
    };
    try {
      const response = await Axios.post(API.V1.ACCOUNT_LOGIN, loginPayload);
      if (response.status === 401) {
        console.log(response.data, "Invalid credentials");
      }
      const AccessToken = response.data.token;
      console.log(AccessToken, "this is access token--->");
      localStorage.setItem(LOCAL_STORAGE_KEY, AccessToken);
      if (response.status === 201) {
        dispatch(setLoggedIn(true));
        navigate("/checkin/photo-interaction");
      }
      // setUser(await response.data);
      // await dispatch(fetchUser());
      // navigate("/");
      // setIsLoggedIn(true);
    } catch (error) {
      console.log(error, "something went wrong while logging in");
    }
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
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <form className="w-full max-w-sm  form-shadow p-20">
        <h1 className="mb-10 text-xl font-bold">CheckIn Form</h1>
        <div className="mb-1">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''
              }`}
            placeholder="Enter your email address"
          />
          {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
        </div>
        <div className="mb-2">
          <button
            className={`${isButtonDisabled ? 'text-gray-700 cursor-not-allowed text-sm' : 'text-blue-700 hover:underline focus:outline-none text-sm'
              }`}
            type="button"
            onClick={handleSendOtp}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? `Resend OTP in ${countdown}s` : "Send OTP"}
          </button>
        </div>
        {/* {!isOtpSent ? ( */}
        <div className="mb-6">
          <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${otpError ? 'border-red-500' : ''
              }`}
            placeholder="Enter OTP"
          />
          {otpError && <p className="text-red-500 text-xs italic mt-1">{otpError}</p>}
        </div>
        {/* ) : null} */}
        <div className="flex items-center justify-between flex-row-reverse">
          <a href="/checkin/photo-interaction"
            className="bg-green-500 hover:bg-green-700 text-sm  text-white font-bold py-3 px-5 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCheckIn}
            shadow-lg
          >
            Check-In
          </a>
        </div>
      </form>
    </div>
  );
};

export default CheckIn;
