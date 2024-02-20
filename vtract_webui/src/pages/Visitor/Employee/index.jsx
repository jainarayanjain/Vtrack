import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAccessCard, useAuth } from "../../../hooks";
import { CancelButton, NextButton } from "../../../components";
import { API, Browser } from "../../../constants";
import { useAppSelector } from "../../../hooks";
import Axios from "../../../services/axios";
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    // email: "",
    tempAccessCard: "",
    meetingPerson: "",
  });

  const Auth = useAuth();
  const Access = useAccessCard();
  const navigate = useNavigate();

  const selector = useAppSelector((state) => state.media.userData);
  const visitorTypeData = useAppSelector((state) => state.visitor);
  const userData = useAppSelector((state) => state.auth);
  

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  useEffect(() => {
    Access.getAccessCard();
  }, []);

  const handleCancel = () => {
    Auth.logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Basic validation
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.phoneNo.trim() || !/^\d{10}$/.test(formData.phoneNo.trim())) {
      newErrors.phoneNo = "Please enter a valid 10-digit phone number";
    }
    if (!formData.tempAccessCard.trim() || !/^\d{3}$/.test(formData.tempAccessCard.trim())) {
      newErrors.tempAccessCard = "Temp Access Card must be 6 digits";
    }
    // if (!formData.meetingPerson.trim()) {
    //   newErrors.meetingPerson = "Meeting Person is required";
    // }

    // If there are errors, update the state and prevent form submission
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    // If no errors, proceed to create a payload for the API
    const payload = {
      name: formData.firstName + " " + formData.lastName,
      phone: formData.phoneNo,
      // email: formData.email,
      tempAccessCard: formData.tempAccessCard,
      // photo: selector.userPhoto,
      // signature: selector.userSignature,
      // national_id: nidSelector.nidImage,
      // nid_type: nidSelector.nidType,
      // meetingPerson: formData.meetingPerson,
    };
    try {
      const response = await Axios.patch(`${API.V1.VISITOR_DETAILS}${userData.userId}/`, payload);
      if (response.status === 401) {
        console.log(response.data, "something went strongly wrong");
      }
      const AccessToken = response.data.token;
      if (response.status === 200) {
        navigate(Browser.HOSTDETAIL); // Adjust the path accordingly
      }
      // setUser(await response.data);
      // await dispatch(fetchUser());
      // navigate("/");
      // setIsLoggedIn(true);
    } catch (error) {
      console.log(error, "something went wrong while logging in");
    }

    // Now you can use the 'payload' to send data to your API
    console.log("API Payload:", payload);

    // Navigate to the appropriate page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle">
      <div className="form-shadow p-10 rounded-2xl">
        <div className="flex flex-row justify-between gap-28">
          <h1 className="text-2xl font-bold mb-6">Employee Details Form</h1>
          <img src="../images/innova.png" alt="Company Logo" className="h-7  w-auto" />
        </div>
        <form className=" mx-auto rounded-2xl" onSubmit={handleSubmit}>
          {/* Form inputs */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col  md:w-1/2">
                <label className="text-gray-700">First Name:*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`border rounded-md p-2 ${errors.firstName ? "border-red-500" : ""}`}
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
              </div>

              <div className="flex flex-col  md:w-1/2">
                <label className="text-gray-700">Last Name:*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`border rounded-md p-2 ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700">Phone No.:*</label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.phoneNo ? "border-red-500" : ""}`}
              />
              {errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
            </div>
            {/* <div className="flex flex-col ">
              <label className="text-gray-700">Email:*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div> */}
            {/* <div className="flex flex-col mb-10">
              <label className="text-gray-700">Temp Access Card:</label>
              <input
                type="text"
                name="tempAccessCard"
                value={formData.tempAccessCard}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.tempAccessCard ? "border-red-500" : ""}`}
              />
              {errors.tempAccessCard && <p className="text-red-500">{errors.tempAccessCard}</p>}
            </div> */}

            <div className="relative z-0 w-full mb-10 group flex flex-col">
              <label className="text-gray-700">Access Card:*</label>
              <select
                name="tempAccessCard"
                value={formData.tempAccessCard}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.tempAccessCard ? "border-red-500" : ""}`}
              >
                <option value="" disabled>
                  Select Access Card*
                </option>
                {Access?.access?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.card_number}
                  </option>
                ))}
              </select>
              {submitted && errors.tempAccessCard && <p className="text-red-500">{errors.tempAccessCard}</p>}
            </div>
          </div>
          {/* <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4  mb-2 w-full"
          >
            Submit
          </button> */}
          <div className="flex gap-2">
            <CancelButton />
            <NextButton name={"Submit"} type={"submit"} icons={<MdOutlineCheckCircleOutline />} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
