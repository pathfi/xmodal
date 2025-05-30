import React from "react";

const Button = ({ className, children, onBtnClick, type }) => {
  return (
    <>
      <button className={`btn  ${className}`} onClick={onBtnClick} type={type}>
        {children}
      </button>
    </>
  );
};

export default Button;