import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Admin = (props) => {
  return (
    <div className="admin">
      <div className="callToActions">
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
