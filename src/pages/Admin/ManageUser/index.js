import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersStart } from "./../../../redux/User/user.actions";

import Modal from "../../../components/Modal";
import FormInput from "../../../components/forms/FormInput";
import Button from "../../../components/forms/Button";

import "./styles.scss";
const mapState = (state) => ({
  users: state.user.users,
});

const ManageUser = (props) => {
  // Global state
  const dispatch = useDispatch();
  const { users } = useSelector(mapState);

  // Local state
  const [hideModal, setHideModal] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, []); // []: Only runs on first initial render of Admin component

  const toggleModal = () => {
    setHideModal(!hideModal);
    setDisplayName("");
    setEmail("");
    setPassword("");
  };

  const configModal = {
    hideModal,
    toggleModal,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // dispatch(
    // addUserStart({
    //   displayName,
    //   email,
    //   password,
    // })
    resetForm();
  };
  const resetForm = () => {
    setHideModal(true);
    setDisplayName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="manage-user">
      <h1>Manage Users</h1>
      <div className="manage-user__action">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add User</Button>
          </li>
        </ul>
      </div>

      <div className="manage-user__info">
        <table border="0" cellPadding="10" cellSpacing="0">
          <tbody>
            {users.map((user, index) => {
              const { displayName, email, userRoles, createdDate } = user;

              return (
                <tr key={index}>
                  <td>{displayName}</td>
                  <td>{email}</td>
                  <td>
                    <ul>
                      {userRoles.map((role) => {
                        return <li>{role}</li>;
                      })}
                    </ul>
                  </td>
                  <td>{createdDate.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal {...configModal}>
        <div className="addUserForm">
          <form onSubmit={handleSubmit}>
            <h2>Add user</h2>

            <FormInput
              label="Name"
              type="text"
              value={displayName}
              handleChange={(e) => setDisplayName(e.target.value)}
            />

            <FormInput
              label="Email"
              type="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              label="Password"
              type="text"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit">Add user</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUser;
