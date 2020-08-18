import React, { useState } from "react";

import { auth, handleUserProfile } from "./../../firebase/utils";
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput";

import "./styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

const Signup = (props) => {
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

    // Input validation
    if (state.password !== state.confirmPassword) {
      const err = ["Password not match"];
      setState((prevState) => ({
        ...prevState,
        errors: [...state.errors, err],
      }));
      return;
    }

    // Write to firebase
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        state.email,
        state.password
      );
      await handleUserProfile(user, { displayName: state.displayName });
      setState(initialState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <div className="wrap">
        <h2>Signup</h2>

        {state.errors.length > 0 && (
          <ul>
            {state.errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <div className="formWrap">
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={state.displayName}
              placeholder="Name"
              onChange={handleInputChange}
            />
            <FormInput
              type="email"
              name="email"
              value={state.email}
              placeholder="E-mail"
              onChange={handleInputChange}
            />

            <FormInput
              type="password"
              name="password"
              value={state.password}
              placeholder="Password"
              onChange={handleInputChange}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <Button type="submit">Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
