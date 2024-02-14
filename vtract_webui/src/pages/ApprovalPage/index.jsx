import React, { useEffect } from "react";
import "../../assets/confetti.css";
import { Confetti } from "../../components";

const ApprovalPage = ({ isApproved }) => {
  return (
    <>
      <div className="js-container container" style={{ top: "0px !important" }} />
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0px",
          left: "0px",
        }}
      >
        {true ? (
          <>
            <Confetti />
            <div className="checkmark-circle">
              <div className="background"></div>
              <div className="checkmark draw"></div>
            </div>
            <h1>Congratulations!</h1>
            <p>You are all set. Well done!</p>
            <button className="submit-btn" type="submit" onClick={() => alert("😀😀😁😊☺🙂\n Yes I got the Entry!!!!!!!")}>
              Continue
            </button>
          </>
        ) : (
          <>
            <h1>Regret</h1>
            <p>We're sorry, but your request was not approved.</p>
            <button className="submit-btn" type="submit" onClick={() => alert("🥺🥺🥺🥺🥺\n You can try again.")}>
              Go Back
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ApprovalPage;
