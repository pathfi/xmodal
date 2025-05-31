import React from "react";
import Button from "./Button";

const Modal = ({ phoneNumber, handlePhoneNumber, onFormSubmit }) => {
  return (
    <div className="modal-content">
      <form className="form-container" onSubmit={onFormSubmit}>
        <h3>Fill Details</h3>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder=""
        />

        <label htmlFor="email">Email Address:</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder=""
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder=""
          value={phoneNumber}
          onChange={handlePhoneNumber}
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          id="dob"
          placeholder=""
        />

        <Button className="submit-button" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Modal;
