import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { auth } from "./../../firebase/utils";
import Logo from "./../../assets/logo.png";
import "./styles.scss";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Header = () => {
  const { currentUser } = useSelector(mapState);
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Click & Go Logo" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>
              <li>
                <Link onClick={() => auth.signOut()} to="/">
                  LogOut
                </Link>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
