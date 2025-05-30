/* nOTE -- 
 
1) dO AGAIN THE OUTSIDE CLICK THING if problem see quad b there you have implemented this feature.

2) see the css that chatgpt gave you  for the modal that will be helpful to understand how to make modal.................

   */

import React, { useEffect, useState } from "react";
// import "./App.css";
import "./App.css";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  // All Hooks here :--
  const [viewModal, setViewModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (!viewModal) return;
    // if modal is already closed then no need to open the useeffect function .

    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-content")) {
        // closest() check karta hai kya click .modal-content ke andar hua — agar nahi, toh matlab bahar hai
        setViewModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [viewModal]);

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     // agar clicked element ka className 'modal' hai
  //     if (e.target.className === "modal") {
  //       setViewModal(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  //------------------- All function here :---

  const handleFormOpen = () => setViewModal(!viewModal);

  const handleSumbit = function (e) {
    // console.log(e);
    e.preventDefault();
    let username =e.target["username"].value;
    let email = e.target["email"].value;
   let phone = e.target["phone"].value;
    let dateOB =e.target["dob"].value;
    if(!username || !email || !phone || !dateOB) {
      alert("Please fill all the fields");
      return;
    }
    if (e.target["phone"].value.length !== 10) alert("Invalid phone number");
    // alert("Invalid date of birth");
    // alert("Invalid email");
    const dateGiven = new Date(e.target["dob"].value).getTime();
    // console.log(dateGiven);
    const date = new Date().getTime();
    // console.log(date);

    if (dateGiven > date) {
      alert("Invalid date of birth");
    }

    // if (e.target["dob"].value.length !== 10) alert("Invalid date of birth");
  };

  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const styleAppContainer = {
    opacity: 0.5,
  };

  return (
    <>
      <div className="app-Container" style={viewModal ? styleAppContainer : {}}>
        {/* because style expects an object not a string  */}
        <h1>User Details Modal</h1>

        {/* <button className="btn">Open Form</button> */}
        <Button onBtnClick={handleFormOpen}>Open Form</Button>

        {/* {viewModal && (
          <div className="modal">
            <Modal
              handlePhoneNumber={handlePhoneNumber}
              phoneNumber={phoneNumber}
              onFormSubmit={handleSumbit}
            ></Modal>
          </div>
        )} */}
      </div>
      {viewModal && (
        <div className="modal">
          <Modal
            handlePhoneNumber={handlePhoneNumber}
            phoneNumber={phoneNumber}
            onFormSubmit={handleSumbit}
          ></Modal>
        </div>
      )}
    </>
  );
};

export default App;