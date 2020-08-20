import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutStart } from "./../redux/User/user.actions";

import VerticalNav from "../components/VerticalNav";

const AdminLayout = (props) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutStart());
  };

  return (
    <div className="adminLayout">
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/admin">Home</Link>
              </li>
              <li>
                <Link to="/admin/manageUser">Manage User</Link>
              </li>
              <li>
                <Link to="/admin/manageProduct">Manage Product</Link>
              </li>
              <li>
                <Link to="/" onClick={signOut}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content"> {props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
