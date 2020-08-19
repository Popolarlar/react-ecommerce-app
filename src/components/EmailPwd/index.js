import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "./../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import "./styles.scss";

const EmailPwd = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setEmail("");
    setErrors("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Redirect location after reset password
    const config = {
      url: "http://localhost:3000/login",
    };

    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          // Redirect location after form submitted
          props.history.push("/login");
          resetForm();
        })
        .catch(() => {
          const err = ["Email not found. Please try again."];
          setErrors(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const configAuthWrapper = {
    headline: "Forgot Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="E-mail"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">Retrieve</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPwd);
