import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Admin = (props) => {
  return (
    <div className="admin">
      <h1>Welcome back!</h1>
      <div className="admin__action">
        <ul>
          <li>
            <span>I want to...</span>
          </li>
          <li>
            <Link to="/admin/manageUser">Manage User</Link>
          </li>
          <li>
            <Link to="/admin/manageProduct">Manage Product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
