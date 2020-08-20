import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersStart } from "./../../../redux/User/user.actions";

import "./styles.scss";
const mapState = (state) => ({
  users: state.user.users,
});

const ManageUser = (props) => {
  // Global state
  const dispatch = useDispatch();
  const { users } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, []); // []: Only runs on first initial render of Admin component

  return (
    <div className="admin">
      <div className="manageUsers">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Users</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {users.map((user, index) => {
                      const {
                        displayName,
                        email,
                        userRoles,
                        createDate,
                      } = user;

                      return (
                        <tr key={index}>
                          <td>{displayName}</td>
                          <td>{email}</td>
                          <td>{userRoles}</td>
                          <td>{createDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
