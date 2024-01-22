// pageInteraction.js

import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

const PageInteraction = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [showCaptureButton, setShowCaptureButton] = useState(false);
  const [isPhotoCaptured, setIsPhotoCaptured] = useState(false);

  const videoRef = useRef(null);
  const signatureRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Use the front camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCaptureButton(true); // Show the capture button after starting the camera
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleProfilePhotoClick = () => {
    startCamera();
    setShowCaptureButton(true);
    setProfilePhoto(null);
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
      setProfilePhoto(dataURL);

      // Stop the camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      // Hide the capture button after photo is captured
      setShowCaptureButton(false);
      setIsPhotoCaptured(true);
    }
  };
  const handleRetakePhoto = () => {
    setIsPhotoCaptured(false);
    setProfilePhoto(null); // Reset profilePhoto to null

    startCamera();
    setShowCaptureButton(true);
  };

  const handleSignatureClear = () => {
    signatureRef.current.clear();
    setSignature(null); // Clear the signature state
  };

  const handleSignatureSave = () => {
    const dataURL = signatureRef.current.toDataURL();
    setSignature(dataURL);
    console.log(dataURL, "this is signature--->");
  };

  const handlePhotoSave=()=>{
    let formData=new FormData();
    formData.append('photo',profilePhoto?convertBase64ToBlob(profilePhoto):null);
    formData.append('signature',signature?convertBase64ToBlob(
      signature):null);

    
  }
  const handleSignatureEnd = () => {
    const dataURL = signatureRef.current.toDataURL();
    setSignature(dataURL);
  };

  const dummyImage = "/images/profile-photo.png";

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Employee Check-In/Check-Out</h1>

      <div className="mb-8 relative">
        <div className="relative rounded-full w-72 h-72 overflow-hidden ">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <div>
              {!showCaptureButton && (
                <img src="/images/profile-photo.png" alt="Dummy Profile" className="object-cover w-full h-full" />
              )}
              {showCaptureButton && (
                <video ref={videoRef} className="rounded-full w-full h-80 object-cover " autoPlay={true} />
              )}
            </div>
          )}
        </div>

      

        <>
          {showCaptureButton && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute  left-0 mt-2 ml-2 z-10"
              onClick={handleCapturePhoto}
            >
              Capture Photo
            </button>
          )}
        </>

        <div className="flex gap-3 justify-center">
        <>
          {isPhotoCaptured && (
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold  px-4 rounded mt-2"
              onClick={handlePhotoSave}
            >
              Save Photo
            </button>
          )}
        </>
          {!showCaptureButton && (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  bottom-0  z-10 mt-2"
                onClick={handleProfilePhotoClick}
              >
                { !isPhotoCaptured?"Click for Profile Photo":"retake photo"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Signature</label>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{ className: "border rounded-md", width:500, height:170  }}
          onEnd={handleSignatureEnd}
        />
      </div>

      {signature && (
        <div className="mb-2">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignatureClear}
          >
            Clear Signature
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleSignatureSave}
          >
            Save Signature
          </button>
        </div>
      )}

      <a href="/visitor"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => console.log("Check-In/Check-Out")}
      >
        Check-In/Check-Out
      </a>
    </div>
  );
};

export default PageInteraction;
