// src/components/NidForm.js

import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useNidtypes } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import Axios from "../../../services/axios";
import { API } from "../../../constants";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { NextButton } from "../../../components";
import { FiRepeat } from "react-icons/fi";


const NidForm = () => {
  const [nidType, setNIDType] = useState("");
  const [nidImage, setNidImage] = useState(null);
  const [nidImageBlob, setNidImageBlob] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isPhotoCaptured, setIsPhotoCaptured] = useState(false);

  const videoRef = useRef();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nidTypes = useNidtypes();

  useEffect(() => {
    nidTypes.getNidtypes();
  }, []);

  const formData = new FormData();

  const handleBase64InputChange = (base64String) => {
    // Convert Base64 to binary
    const binaryString = decodeURIComponent(base64String);
    // Create an array buffer from the binary string
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the array buffer
    const newBlob = new Blob([arrayBuffer], { type: "image/jpeg" });
    // Update state with the new Blob object
    // setNidImageBlob(newBlob);
    return newBlob;
    // setProfilePhoto(newBlob);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleCapturePhoto = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      // Convert the canvas content to base64 data URL
      formData.append("national_id", canvas);
      const dataURL = canvas.toDataURL("image/png");
      const blobImage = handleBase64InputChange(dataURL);
      setNidImage(dataURL);
      setNidImageBlob(blobImage);

      // Stop the camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      setShowCamera(false);
      setIsPhotoCaptured(true);
    }
  };

  const handleCaptureImage = () => {
    startCamera();
    setShowCamera(true);
    setNidImage(null);
  };

  const handleRetakePhoto = () => {
    setIsPhotoCaptured(false);
    setNidImage(null);

    startCamera();
    setShowCamera(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("nid_type", nidType);
    // formData.append("national_id", nidImageBlob);
    // You can handle the form submission logic here
    const NidData = {
      nid_type: nidType,
      national_id: nidImageBlob,
    };
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = Axios.patch(`${API.V1.VISITOR_DETAILS}1/`, formData, config);
      const data = response.data;
      if (data.status == 200) {
        navigate("/visitor");
      }
    } catch (e) {
      console.log("something went wrong", e);
    }
    if (nidType != "" && nidImage != null) {
      navigate("/visitor");
    }
  };

  return (
    <div className=" w-2/3 mx-auto mt-8 p-4 rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nidType">
            Select NID Type *
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            id="nidType"
            value={nidType}
            onChange={(e) => setNIDType(e.target.value)}
          >
            <option value="" disabled>
              Select NID Type
            </option>
            {/* <option value="aadhar">Aadhar Card</option>
            <option value="pan">PAN Card</option>
            <option value="driving">Driving License</option> */}
            {nidTypes?.nidtypesData?.map((data) => (
              <option value={data.id} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Upload Image *
          </label>
          {showCamera ? (
            <div className="mb-2">
              <div className="text-center mb-2">Camera Preview:</div>
              <video ref={videoRef} className="w-full" autoPlay></video>
              <button
                type="button"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleCapturePhoto}
              >
                Capture Photo
              </button>
            </div>
          ) : (
            <div className="relative">
              {isPhotoCaptured && <img src={nidImage} alt="Captured" className="w-full rounded-md" />}
              <button
                type="button"
                className={`${
                  isPhotoCaptured ? "hidden" : ""
                } mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600`}
                onClick={handleCaptureImage}
              >
                Capture from Camera
              </button>
            </div>
          )}
        </div>
        {isPhotoCaptured && (
          <div className="mb-2 flex gap-8">
            <button
              type="button"
              className=" flex items-center gap-1 justify-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleRetakePhoto}
              >
                Retake Photo
                <FiRepeat/>
            </button>
            <NextButton name={"Submit"} icons={<MdOutlineCheckCircleOutline />} type={"submit"} />
          </div>
        )}
      </form>
    </div>
  );
};

export default NidForm;
