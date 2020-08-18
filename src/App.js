import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// firebase
import { auth, handleUserProfile } from "./firebase/utils";

// layouts
import HomepageLayout from "./layouts/HomepageLayout";
import MainLayout from "./layouts/MainLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

import "./default.scss";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Anything in here is fired on component mount.
    const authListener = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // Add or read uer profile in the DB
        const userRef = await handleUserProfile(authUser);

        // Write the user to local state
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    // returned function will be called on component unmount
    return () => {
      authListener();
    };
  });

  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;
