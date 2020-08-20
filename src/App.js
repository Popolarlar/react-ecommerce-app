import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";

//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// layouts
import HomepageLayout from "./layouts/HomepageLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

// pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ManageUser from "./pages/Admin/ManageUser";
import ManageProduct from "./pages/Admin/ManageProduct";
import EditProduct from "./pages/Admin/EditProduct";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./default.scss";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      {/* <AdminToolBar /> */}
      <Header />
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
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )}
        />

        <Route
          path="/admin/manageUser"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <ManageUser />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
        <Route
          path="/admin/manageProduct/edit/:id"
          render={(routerProps) => (
            <WithAdminAuth>
              <AdminLayout>
                <EditProduct documentID={routerProps.match.params.id} />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
        <Route
          path="/admin/manageProduct"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <ManageProduct />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />

        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
