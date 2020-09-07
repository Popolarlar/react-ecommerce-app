import React from "react";

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
        </ul>
      </div>
    </div>
  );
};

export default Admin;
