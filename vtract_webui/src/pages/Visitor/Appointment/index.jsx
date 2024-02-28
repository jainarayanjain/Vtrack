import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/main.css";
import { useAppDispatch, useCategory, useRecordSubmit } from "../../../hooks";
import { useAuth } from "../../../hooks";
import { CancelButton, CategoryDropdown } from "../../../components";
import { useSelector } from "react-redux";
import { API, Browser } from "../../../constants";
import { setAccessCardId } from "../../../features/VisitorSlice";
import Axios from "../../../services/axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    purposeOfVisit: "",
    meetingPerson: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const Category = useCategory();
  const Auth = useAuth();
  const VisitorRecord = useRecordSubmit();
  const dispatch=useAppDispatch();
  const photoData = useSelector((state) => state.media.userData);
  const visitorTypeData = useSelector((state) => state.visitor);
  const userData = useSelector((state) => state.auth);


 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(e.target.name==="purposeOfVisit"){
      dispatch(setAccessCardId({categoryId:e.target.value}))
    }
    setErrors({ ...errors, [e.target.name]: "" });
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
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.purposeOfVisit.trim()) {
      newErrors.purposeOfVisit = "Purpose of Visit is required";
    }

    // If there are errors, update the state and prevent form submission
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    // If no errors, proceed to create a payload for the API
    const payload = {
      name: formData.firstName + " " + formData.lastName,
      phone: formData.phoneNo,
      email: formData.email,
      purposeOfVisit: formData.purposeOfVisit,
    };
    console.log(payload, "this is payload");

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

    if (payload != null) {
      VisitorRecord.submitRecord(payload);

      navigate(Browser.HOSTDETAIL);
    }
    // Now you can use the 'payload' to send data to your API
    console.log("API Payload:", payload);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen align-middle">
      <div className="form-shadow p-10 rounded-2xl">
        <div className="flex flex-row justify-between gap-28">
          <h1 className="text-2xl font-bold mb-6">Visitor Details Form</h1>
          <img src="../images/innova.png" alt="Company Logo" className="h-7  w-auto" />
        </div>
        <form className="max-w-md mx-auto rounded-2xl" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col mb-4 md:w-1/2">
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

            <div className="flex flex-col mb-4 md:w-1/2">
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

          <div className="relative flex flex-col z-0 w-full mb-5 group">
            <label className="text-gray-700">Phone Number:*</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.phoneNo ? "border-red-500" : ""}`}
            />
            {submitted && errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
          </div>

          <div className="relative flex flex-col z-0 w-full mb-5 group">
            <label className="text-gray-700">Email:*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.email ? "border-red-500" : ""}`}
            />
            {submitted && errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <CategoryDropdown formData={formData} errors={errors} handleChange={handleChange} submitted={submitted} />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-2 w-full"
          >
            Submit
          </button>
        </form>
        <CancelButton />
      </div>
    </div>
  );
};

export default AppointmentForm;
