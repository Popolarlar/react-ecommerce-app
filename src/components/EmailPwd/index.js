import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailPassword,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";

import AuthWrapper from "./../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import "./styles.scss";

const mapState = (state) => ({
  emailPasswordSuccess: state.user.emailPasswordSuccess,
  emailPasswordError: state.user.emailPasswordError,
});

const EmailPwd = (props) => {
  const dispatch = useDispatch();
  const { emailPasswordSuccess, emailPasswordError } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (emailPasswordSuccess) {
      resetForm();
      // Redirect location after form submitted
      props.history.push("/login");
    }
  }, [emailPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(emailPasswordError) && emailPasswordError.length > 0) {
      setErrors(emailPasswordError);
    }
  }, [emailPasswordError]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(emailPassword({ email }));
  };

  const resetForm = () => {
    setEmail("");
    setErrors("");
    dispatch(resetAllAuthForms());
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
