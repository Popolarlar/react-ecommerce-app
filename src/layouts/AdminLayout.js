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
    <div className="dashboardLayout">
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/admin">Home</Link>
              </li>
              <li>
                <Link to="/admin/manageCategory">Categories</Link>
              </li>
              <li>
                <Link to="/admin/manageProduct">Products</Link>
              </li>
              <li>
                <Link to="/admin/">Orders</Link>
              </li>
              <li>
                <Link to="/admin/manageUser">Users</Link>
              </li>
              <li>
                <Link to="/admin/">Setting</Link>
              </li>
              <li>
                <Link to="/" onClick={signOut}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
