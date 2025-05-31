import React from "react";

const Button = ({ className, children, onBtnClick, type }) => {
  return (
    <button
      className={`btn ${className || ""}`}
      onClick={onBtnClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
