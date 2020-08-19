import React from "react";
import { useSelector } from "react-redux";

import "./styles.scss";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Admin = (props) => {
  // Global state
  const { currentUser } = useSelector(mapState);

  return <div>Hello, admin</div>;
};

export default Admin;
