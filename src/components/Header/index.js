import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutStart } from "../../redux/User/user.actions";
import { checkUserIsAdmin } from "./../../Utils";
import "./styles.scss";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Header = () => {
  // Global state
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAdmin(currentUser);

  const signOut = () => {
    dispatch(signOutStart());
  };

  return (
    <nav className="flex-nav">
      <div className="container">
        <div className="flex-nav__logo">
          <Link to="/">
            <p>Click & Go</p>
          </Link>
        </div>
        <div className="flex-nav__menu">
          {/* <a href="#" class="toggle-nav">Menu <i class="ion-navicon-round"></i></a> */}
          {currentUser && (
            <ul>
              {isAdmin && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <Link to="/products/all">Products</Link>
              </li>
              <li>
                <Link to="/dashboard">Account</Link>
              </li>
              <li>
                <Link onClick={signOut} to="/">
                  LogOut
                </Link>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/products/all">Products</Link>
              </li>
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
    </nav>

    // <header className="header">
    //   <div className="wrap">
    //     <div className="logo">
    //       <Link to="/">
    //         <img src={Logo} alt="Click & Go Logo" />
    //       </Link>
    //     </div>

    //     <div className="callToActions">
    //       {currentUser && (
    //         <ul>
    //           {isAdmin && (
    //             <li>
    //               <Link to="/admin">Admin</Link>
    //             </li>
    //           )}
    //           <li>
    //             <Link to="/dashboard">Account</Link>
    //           </li>
    //           <li>
    //             <Link onClick={signOut} to="/">
    //               LogOut
    //             </Link>
    //           </li>
    //         </ul>
    //       )}

    //       {!currentUser && (
    //         <ul>
    //         <li>
    //             <Link to="/products">Products</Link>
    //           </li>
    //           <li>
    //             <Link to="/registration">Register</Link>
    //           </li>
    //           <li>
    //             <Link to="/login">Login</Link>
    //           </li>

    //         </ul>
    //       )}
    //     </div>
    //   </div>
    // </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
