import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "./../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import "./styles.scss";

const initialState = {
  email: "",
  errors: [],
};

const EmailPwd = (props) => {
  const [state, setState] = useState(initialState);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Redirect location after reset password
    const config = {
      url: "http://localhost:3000/login",
    };

    try {
      await auth
        .sendPasswordResetEmail(state.email, config)
        .then(() => {
          // Redirect location after form submitted
          props.history.push("/login");
          setState(initialState);
        })
        .catch(() => {
          const err = ["Email not found. Please try again."];
          setState({ errors: err });
        });
    } catch (error) {
      // const err = ["Something went wrong when sending password email."];
      // setState({ errors: err });
      console.error(error);
    }
  };

  const configAuthWrapper = {
    headline: "Forgot Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {state.errors.length > 0 && (
          <ul>
            {state.errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="email"
            name="email"
            value={state.email}
            placeholder="E-mail"
            onChange={handleInputChange}
          />

          <Button type="submit">Retrieve</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPwd);
