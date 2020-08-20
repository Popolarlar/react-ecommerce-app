import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutStart } from "./../redux/User/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/Header";
import VerticalNav from "../components/VerticalNav";
import Footer from "../components/Footer";

const AdminLayout = (props) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutStart());
  };

  return (
    <div className="adminLayout">
      <Header {...props} />
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
      <Footer />
    </div>
  );
};

export default AdminLayout;
