import { useEffect } from "react";
// import Axios from "../services/axios";

const useWarnIfUnsavedChanges = (isFormDirty, apiEndpoint) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        // Show a custom confirmation dialog
        const confirmation = window.confirm("You have unsaved changes, do you really want to leave?");

        // If the user confirms, make the API call and then allow the page to unload
        if (confirmation) {
          console.log("this is being caleld--->>>");
          try {
            // Blocking API call (synchronous) before the unload
            navigator.sendBeacon(apiEndpoint); // Use sendBeacon for synchronous requests
            console.log("API called successfully on unload.");
          } catch (error) {
            console.error("Error in API call on unload:", error);
          }
        } else {
          console.log("this is cancelled");
          // If the user cancels, prevent the unload
          event.preventDefault(); // Prevent the page from unloading
          event.returnValue = ""; // Some browsers require this to show the native prompt
        }
      }
    };

    // Listen for the beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty, apiEndpoint]);

  const handleUserNavigation = async () => {
    if (isFormDirty) {
      const confirmation = window.confirm("You have unsaved changes, do you really want to leave?");
      if (confirmation) {
        try {
          const response = await Axios.post(apiEndpoint);
          console.log("API call successful.");
        } catch (error) {
          console.error("Error in API call:", error);
        }
      }
    }
  };

  return handleUserNavigation;
};

export default useWarnIfUnsavedChanges;
