import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutStart } from "./../redux/User/user.actions";

import VerticalNav from "./../components/VerticalNav";

const DashboardLayout = (props) => {
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
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
