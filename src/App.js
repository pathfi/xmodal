import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event) => {
      const modalContent = document.querySelector(".modal-content");
      if (isModalOpen && modalContent && !modalContent.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const { username, email, phone, dob } = formData;

    if (!username || !email || !phone || !dob) {
      alert("All fields are required.");
      return false;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
      alert("Invalid date of birth. Please enter a valid past date.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsModalOpen(false);
      setFormData({ username: "", email: "", phone: "", dob: "" });
    }
  };

  return (
    <div className="App">
      <h2>User Details Modal</h2>
      <button onClick={openModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Fill Details</h3>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" value={formData.username}  required onChange={handleChange} />

              <label>Email Address:</label>
              <input id="email" value={formData.email}  type="email" required onChange={handleChange} />

              <label>Phone Number:</label>
              <input id="phone" value={formData.phone} required onChange={handleChange} />

              <label>Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} onChange={handleChange} />

              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
