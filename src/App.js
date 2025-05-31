import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  // State to control modal visibility
  const [viewModal, setViewModal] = useState(false);

  // State to hold the phone number (as the Modal component expects)
  const [phoneNumber, setPhoneNumber] = useState("");

  // Whenever the modal opens, we install a click‐outside listener
  useEffect(() => {
    if (!viewModal) return;

    const handleOutsideClick = (event) => {
      // If click is not inside .modal-content, close the modal
      if (!event.target.closest(".modal-content")) {
        setViewModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [viewModal]);

  // Toggle modal open/close
  const handleFormOpen = () => {
    setViewModal((prev) => !prev);
    // Clear phoneNumber when re-opening
    if (!viewModal) setPhoneNumber("");
  };

  // The form‐submission handler that the Modal will call
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const dateOB = e.target.dob.value.trim();

    // 1) Validate email format if non‐empty
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Invalid email");
        return;
      }
    }

    // 2) Validate phone format if non‐empty
    if (phone) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        alert("Invalid phone number");
        return;
      }
    }

    // 3) Validate DOB if non‐empty
    if (dateOB) {
      const dateGiven = new Date(dateOB).getTime();
      const now = Date.now();
      if (dateGiven > now) {
        alert("Invalid date of birth");
        return;
      }
    }

    // 4) Finally check for any empty field
    if (!username || !email || !phone || !dateOB) {
      alert("All fields are required.");
      return;
    }

    // 5) If everything is valid:
    alert("Form submitted successfully!");
    setViewModal(false);
  };

  // Controlled phoneNumber setter to pass into Modal
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Dim the background when modal is open
  const styleAppContainer = {
    opacity: 0.5,
  };

  return (
    <>
      <div
        className="app-Container"
        style={viewModal ? styleAppContainer : {}}
      >
        <h1>User Details Modal</h1>
        <Button onBtnClick={handleFormOpen}>Open Form</Button>
      </div>

      {viewModal && (
        <div className="modal">
          <Modal
            phoneNumber={phoneNumber}
            handlePhoneNumber={handlePhoneNumber}
            onFormSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default App;
