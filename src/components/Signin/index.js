import React from "react";
import Button from "./../forms/Button";
import { signInWithGoogle } from "./../../firebase/utils";
import "./styles.scss";

const Signin = (props) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signin">
      <div className="wrap">
        <h2>Login</h2>
        <div className="formWrap">
          <form onSubmit={handleFormSubmit}>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
