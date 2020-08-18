import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "./../../firebase/utils";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import "./styles.scss";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

const Signin = (props) => {
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
    try {
      auth.signInWithEmailAndPassword(state.email, state.password);
      setState(initialState);
    } catch (error) {
      // const err = ["Something went wrong when signing in user."];
      // setState({ errors: err });
      console.error(error);
    }
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {state.errors.length > 0 && (
          <ul>
            {state.errors
              .map((err, index) => <li key={index}>{err}</li>)
              .join("")}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
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

          <Button type="submit">Sign in</Button>

          <div className="socialSignin">
            <div className="row">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  signInWithGoogle();
                }}
              >
                Google Sign in
              </Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Forgot password?</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signin;