import React, { useEffect, useState } from "react";
import { useCategory } from "../../../hooks";
import { CancelButton, CategoryDropdown } from "../../../components";

const ServiceProvider = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyEmail: "",
    purposeOfVisit: "",
    meetingPerson: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const Category = useCategory();

  useEffect(() => {
    Category.getCatergory();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear validation errors only if the user is typing
    if (submitted) {
      setErrors({ ...errors, [e.target.name]: "" });

      // Additional validations
      switch (e.target.name) {
        case "companyEmail":
          validateEmail(e.target.value);
          break;
        case "phoneNumber":
          validatePhoneNumber(e.target.value);
          break;
        default:
          break;
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, companyEmail: "Invalid email address" });
    }
  };

  const validatePhoneNumber = (phoneNo) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNo)) {
      setErrors({ ...errors, phoneNumber: "Phone number must be 10 digits" });
    }
  };

  const handleSubmit = () => {
    console.log("this is working handleSubmit--->");
    // Basic validation
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else {
      validatePhoneNumber(formData.phoneNumber);
    }
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = "Company Email is required";
    } else {
      validateEmail(formData.companyEmail);
    }
    if (!formData.purposeOfVisit.trim()) {
      newErrors.purposeOfVisit = "Purpose of Visit is required";
    }
    if (!formData.meetingPerson.trim()) {
      newErrors.meetingPerson = "Meeting Person is required";
    }

    // If there are errors, update the state and prevent form submission
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   setSubmitted(true);
    //   return;
    // }

    // If no errors, proceed to create a payload for the API
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      companyEmail: formData.companyEmail,
      purposeOfVisit: formData.purposeOfVisit,
      meetingPerson: formData.meetingPerson,
    };

    // Now you can use the 'payload' to send data to your API
    console.log("API Payload:", payload);

    // Reset form and errors after successful submission
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   phoneNumber: "",
    //   companyEmail: "",
    //   purposeOfVisit: "",
    //   meetingPerson: "",
    // });
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl h-screen align-middle">
      <div className="form-shadow p-10 rounded-2xl">
        <div className=" flex flex-row justify-between gap-28">
          <h1 className="text-2xl font-bold mb-4">Service Provider Form</h1>
          <img src="../images/innova.png" alt="Company Logo" className="h-7  w-auto" />
        </div>
        <div className=" flex flex-col md:flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col mb-2 md:w-1/2">
              <label className="text-gray-700">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`border rounded-md p-2 ${errors.firstName ? "border-red-500" : ""}`}
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>

            <div className="flex flex-col mb-2 md:w-1/2">
              <label className="text-gray-700">Last Name:</label>
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
          <div className="relative z-0 w-full mb-2 group flex flex-col">
            <label className="text-gray-700">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.phoneNumber ? "border-red-500" : ""}`}
            />
            {submitted && errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          </div>
          <div className="relative z-0 w-full mb-2 group flex flex-col">
            <label className="text-gray-700">Company Email:</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className={`border rounded-md p-2 ${errors.companyEmail ? "border-red-500" : ""}`}
            />
            {submitted && errors.companyEmail && <p className="text-red-500">{errors.companyEmail}</p>}
          </div>
          <CategoryDropdown formData={formData} errors={errors} handleChange={handleChange} submitted={submitted} />
        </div>

        {/* ... Other form fields ... */}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-2 w-full "
          onClick={handleSubmit}
        >
          Submit
        </button>
        <CancelButton />
      </div>
    </div>
  );
};

export default ServiceProvider;
