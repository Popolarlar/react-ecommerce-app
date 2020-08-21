import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePasswordStart } from "./../../../redux/User/user.actions";

import Modal from "../../../components/Modal";
import FormInput from "../../../components/forms/FormInput";
import Button from "../../../components/forms/Button";

import "./styles.scss";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  updatePasswordSuccess: state.user.updatePasswordSuccess,
  userErr: state.user.userErr,
});

const Profile = (props) => {
  // Global state
  const dispatch = useDispatch();
  const {
    currentUser: { displayName, email },
    updatePasswordSuccess,
    userErr,
  } = useSelector(mapState);

  // Local state
  const [hideModal, setHideModal] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (updatePasswordSuccess) {
      resetForm();
    }
  }, [updatePasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const toggleModal = () => {
    setHideModal(!hideModal);
    setPassword("");
    setConfirmPassword("");
    setErrors("");
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePasswordStart({ password, confirmPassword }));
  };

  const resetForm = () => {
    setHideModal(true);
    setPassword("");
    setConfirmPassword("");
    setErrors("");
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile__action">
        <ul>
          <li>
            <Button>Edit Profile</Button>
          </li>
          <li>
            <Button onClick={() => toggleModal()}>Change Password</Button>
          </li>
        </ul>
      </div>
      <div className="profile__info">
        <ul>
          <li>
            <span>Name:</span>
            {displayName}
          </li>
          <li>
            <span>Email:</span>
            {email}
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="changePasswordForm">
          <h2>Change Password</h2>
          <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <div className="error-text">
                <ul>
                  {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <FormInput
              type="password"
              value={password}
              placeholder="New Password"
              handleChange={(e) => setPassword(e.target.value)}
            />

            <FormInput
              type="password"
              value={confirmPassword}
              placeholder="Confirm New Password"
              handleChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit">Update Password</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
