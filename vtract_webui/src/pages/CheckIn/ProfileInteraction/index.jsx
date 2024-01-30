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

  const handlePhotoSave = () => {
    let formData = new FormData();
    formData.append('photo', profilePhoto ? convertBase64ToBlob(profilePhoto) : null);
    formData.append('signature', signature ? convertBase64ToBlob(
      signature) : null);


  }
  const handleSignatureEnd = () => {
    const dataURL = signatureRef.current.toDataURL();
    setSignature(dataURL);
  };

  const dummyImage = "/images/profile-photo.png";

  return (
    <div className="flex flex-col items-center p-10 rounded-2xl .form-shadow justify-center  overflow-x-hidden ">
      <div className="flex flex-col form-shadow justify-center items-center p-8 rounded-2xl">
        
        <div className='flex flex-row justify-between gap-28'>
           <h1 className="text-2xl font-bold mb-4">Employee Check-In</h1>
          <img src="../images/innova.png" alt="Company Logo" className="h-7  w-auto" />
        </div>
        
          <div className="flex object-cover items-center rounded-full h-52 w-52 overflow-hidden justify-center ">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <div>
                {!showCaptureButton && (
                  <img src="/images/profile-photo.png" alt="Dummy Profile" className=" object-cover w-52 h-52" />
                )}
                {showCaptureButton && (
                  <video ref={videoRef} className="rounded-full w-52 h-52 object-cover" autoPlay={true} />
                )}
              </div>
            )}
          </div>


          <div className="flex gap-3 justify-center">
            <>
              {showCaptureButton && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl .form-shadow left-0 mt-2 ml-2 z-10"
                  onClick={handleCapturePhoto}
                >
                  Capture Photo
                </button>
              )}
              {isPhotoCaptured && (
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold  px-4 rounded-xl mt-2"
                  onClick={handlePhotoSave}
                >
                  Save Photo
                </button>
              )}
            </>
            {!showCaptureButton && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl  bottom-0  z-10 mt-2"
                  onClick={handleProfilePhotoClick}
                >
                  {!isPhotoCaptured ? "Click for Profile Photo" : "retake photo"}
                </button>
              </>
            )}
          </div>
        

        <div className="mb-8  ">
          <label className="block text-xl font-medium text-gray-700 mb-2">Signature</label>
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{ className: "border rounded-xl", width: "400%", height: "160%" }}
            onEnd={handleSignatureEnd}
          />
        </div>

        {signature && (
          <div className="mb-2">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold .form-shadow py-2 px-4 rounded-xl"
              onClick={handleSignatureClear}
            >
              Clear Signature
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl ml-2"
              onClick={handleSignatureSave}
            >
              Save Signature
            </button>
          </div>
        )}

        <a href="/visitor"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={() => console.log("Check-In/Check-Out")}
        >
          Check-In/Check-Out
        </a>
      </div>
    </div>

  );
};

export default PageInteraction;
