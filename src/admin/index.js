import React from "react";
import { Main } from "grommet";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import RegisterCompanies from "./pages/RegisterCompanies";
import CompaniesList from "./pages/ListCompanies";
import RegisterEmployees from "./pages/RegisterEmployees";
import CustomHeader from "../common/components/Header";
import ListEmployees from "./pages/ListEmployees";

export default function Admin() {
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
    }
  ];

  return (
    <>
      <CustomHeader menus={menus} homeLink="/admin" />
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

        </Switch>
      </Main>
    </>
  );
}
