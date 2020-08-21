import React from "react";
import { useSelector } from "react-redux";

import "./styles.scss";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Dashboard = (props) => {
  // Global state
  const { currentUser } = useSelector(mapState);

  return (
    <div className="dashboard">
      <h1>Hello, {currentUser.displayName}</h1>
    </div>
  );
};

export default Dashboard;
