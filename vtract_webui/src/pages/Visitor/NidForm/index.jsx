// src/components/NidForm.js

import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useNidtypes } from "../../../hooks";
import { setNID } from "../../../features/NidSlice";
import { useNavigate } from "react-router-dom";

const NidForm = () => {
  const [nidType, setNIDType] = useState("");
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isPhotoCaptured, setIsPhotoCaptured] = useState(false);

  const videoRef = useRef();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nidTypes = useNidtypes();

  useEffect(() => {
    nidTypes.getNidtypes();
  }, []);

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
      const dataURL = canvas.toDataURL("image/png");
      setImage(dataURL);

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
    setImage(null);
  };

  const handleRetakePhoto = () => {
    setIsPhotoCaptured(false);
    setImage(null);

    startCamera();
    setShowCamera(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    const NidData = {
      nidtype: nidType,
      nidImage: image,
    };
    console.log(NidData,'this is nidData--->')
    dispatch(setNID(NidData));
    if (nidType != "" && image != null) {
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
              <option value={data.name} key={data.id}>
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
              {isPhotoCaptured && <img src={image} alt="Captured" className="w-full rounded-md" />}
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
          <div className="mb-2">
            <button
              type="button"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleRetakePhoto}
            >
              Retake Photo
            </button>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NidForm;
