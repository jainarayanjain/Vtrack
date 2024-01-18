// src/components/CheckInPage.js
import React, { useState } from 'react';

const CheckIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [otpError, setOtpError] = useState('');

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Allow only digits
    setPhoneNumber(input);

    if (input.length !== 10) {
      setPhoneNumberError('Phone number must be 10 digits.');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleOtpChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Allow only digits
    setOtp(input);

    if (!input) {
      setOtpError('OTP is required.');
    } else {
      setOtpError('');
    }
  };

  const handleCheckIn = () => {
    // Add your check-in logic here
    if (phoneNumberError || otpError) {
      console.log('Validation failed. Please fix errors.');
      return;
    }

    console.log('Checking in:', { phoneNumber, otp });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <form className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              phoneNumberError ? 'border-red-500' : ''
            }`}
            placeholder="Enter your phone number"
          />
          {phoneNumberError && (
            <p className="text-red-500 text-xs italic mt-1">{phoneNumberError}</p>
          )}
        </div>
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              otpError ? 'border-red-500' : ''
            }`}
            placeholder="Enter OTP"
          />
          {otpError && <p className="text-red-500 text-xs italic mt-1">{otpError}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCheckIn}
          >
            Check-In
          </button>
          {/* <div className="w-12 h-12 bg-gray-300 rounded-full"></div> */}
        </div>
      </form>
    </div>
  );
};

export default CheckIn;
