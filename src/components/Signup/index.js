import React, { useState } from "react";
import Button from "./../forms/Button";

import "./styles.scss";

const Signup = (props) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signup">
      <div className="wrap">
        <h2>Signup</h2>
        <div className="formWrap">
          <form onSubmit={handleFormSubmit}></form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
