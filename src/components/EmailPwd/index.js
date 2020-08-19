import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePasswordStart,
  resetUserState,
} from "./../../redux/User/user.actions";

import AuthWrapper from "./../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import "./styles.scss";

const mapState = (state) => ({
  retrievePasswordSuccess: state.user.retrievePasswordSuccess,
  userErr: state.user.userErr,
});

const EmailPwd = (props) => {
  // Global state
  const dispatch = useDispatch();
  const history = useHistory();
  const { retrievePasswordSuccess, userErr } = useSelector(mapState);

  // Local state
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (retrievePasswordSuccess) {
      resetForm();
      // Redirect location after form submitted
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [retrievePasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(retrievePasswordStart({ email }));
  };

  const resetForm = () => {
    setEmail("");
    setErrors("");
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

export default EmailPwd;
