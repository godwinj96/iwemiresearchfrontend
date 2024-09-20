import React, { useEffect, useState } from "react";

const TermsPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  // Check localStorage for terms acceptance
  useEffect(() => {
    const acceptedTerms = localStorage.getItem("acceptedTerms");
    
    if (!acceptedTerms) {
      // Delay showing the popup by 5 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
        setTimeout(() => setSlideIn(true), 100); // Small delay to apply the slide-in effect
      }, 5000); // 5 seconds delay

      // Clean up the timer when the component is unmounted
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle Accept Terms
  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true"); // Save acceptance to local storage
    setSlideIn(false); // Trigger slide-out animation
    setTimeout(() => setShowPopup(false), 500); // Remove popup after slide-out
  };

  // Handle Decline Terms
  const handleDecline = () => {
    alert("You need to accept the terms to proceed.");
  };

  return (
    <>
      {showPopup && (
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center`}>
          <div
            className={`bg-white rounded-lg p-6 shadow-lg max-w-lg w-full terms-popup ${
              slideIn ? "slide-in" : ""
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <p className="mb-4">
              By using this website, you agree to our Terms of Service and Privacy Policy.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={handleDecline}
              >
                Decline
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAccept}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsPopup;
