import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signInWithGoogle, auth } from "./../../firebase/utils";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import "./styles.scss";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/");
    } catch (error) {
      console.error(error);
    }
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
              <Button onClick={signInWithGoogle}>Google Sign in</Button>
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
