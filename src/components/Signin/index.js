import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "./../../redux/User/user.actions";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import "./styles.scss";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  userErr: state.user.userErr,
});

const Signin = (props) => {
  // Global state
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Error: Actions must be plain objects.
    // dispatch(signInUser({ email, password }));
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    dispatch(googleSignInStart());
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors("");
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <div className="error-text">
            <ul>
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
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

export default Signin;
