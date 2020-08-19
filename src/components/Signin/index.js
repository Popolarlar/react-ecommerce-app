import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import "./styles.scss";

const mapState = (state) => ({
  signInSuccess: state.user.signInSuccess,
});

const Signin = (props) => {
  const dispatch = useDispatch();
  const { signInSuccess } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      props.history.push("/");
    }
  }, [signInSuccess]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Error: Actions must be plain objects.
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    dispatch(signInWithGoogle());
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors("");
    dispatch(resetAllAuthForms());
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => <li key={index}>{err}</li>).join("")}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="email"
            value={email}
            placeholder="E-mail"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Sign in</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Google Sign in</Button>
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

export default withRouter(Signin);
