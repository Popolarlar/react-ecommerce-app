import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSmileWink } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";

const UserProfile = ({ currentUser }) => {
  const { displayName } = currentUser;
  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            {/* <FontAwesomeIcon icon={faSmileWink} /> */}
          </div>
        </li>
        <li>
          <span className="displayName">{displayName && displayName}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
