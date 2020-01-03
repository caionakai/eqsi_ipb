import React, { useEffect } from "react";
import { Main } from "grommet";
import { BrowserRouter as Switch, Route, useHistory } from "react-router-dom";

import RegisterCompanies from "./pages/RegisterCompanies";
import CompaniesList from "./pages/ListCompanies";
import RegisterEmployees from "./pages/RegisterEmployees";
import CustomHeader from "../common/components/Header";
import ListEmployees from "./pages/ListEmployees";
import RegisterAdmin from "./pages/RegisterAdmin";
import ListAdmins from "./pages/ListAdmin";
import Report from "./pages/Report";
import { useUser } from "./hooks/user";
import { logout } from "../common/utils/logout";

const menus = [
  {
    name: "Companies",
    items: [
      {
        name: "List",
        link: "/admin/companies/list"
      },
      {
        name: "Register",
        link: "/admin/companies/register"
      }
    ]
  },
  {
    name: "Employees",
    items: [
      {
        name: "List",
        link: "/admin/employees/list"
      },
      {
        name: "Register",
        link: "/admin/employees/register"
      }
    ]
  },
  {
    name: "Admin",
    items: [
      {
        name: "List",
        link: "/admin/list"
      },
      {
        name: "Register",
        link: "/admin/register"
      }
    ]
  }
];

export default function Admin() {
  const { isLoadingUser, isUserLoggedIn } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (!isUserLoggedIn) {
      logout().then(() => {
        history.replace("/admin/login");
        history.go();
      });
    }
  }, [history, isUserLoggedIn]);

  return (
    !isLoadingUser && (
      <>
        <CustomHeader
          brandLabel="Dashboard"
          menus={menus}
          homeLink="/admin"
          showLogout
        />
        <Main pad="large" align="center">
          <Switch>
            <Route path="/admin/companies/register">
              <RegisterCompanies />
            </Route>

            <Route path="/admin/companies/list">
              <CompaniesList />
            </Route>

            <Route path="/admin/employees/register">
              <RegisterEmployees />
            </Route>

            <Route exact path="/admin/employees/list">
              <ListEmployees />
            </Route>

            <Route exact path="/admin/register">
              <RegisterAdmin />
            </Route>

            <Route exact path="/admin/list">
              <ListAdmins />
            </Route>

            <Route exact path="/admin">
              <Report />
            </Route>
          </Switch>
        </Main>
      </>
    )
  );
}
