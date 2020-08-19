import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// firebase
import { auth, handleUserProfile } from "./firebase/utils";
// redux
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/User/user.actions";
//hoc
import WithAuth from "./hoc/withAuth";

// layouts
import HomepageLayout from "./layouts/HomepageLayout";
import MainLayout from "./layouts/MainLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

import "./default.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Anything in here is fired on component mount.
    const authListener = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // Add or read uer profile in the DB
        const userRef = await handleUserProfile(authUser);

        // Write the user to global state
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      } else {
        dispatch(setCurrentUser(authUser));
      }
    });

    // returned function will be called on component unmount
    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />

        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />

        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
