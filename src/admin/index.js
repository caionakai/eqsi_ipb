import React from "react";
import { Main } from "grommet";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import RegisterCompanies from "./pages/RegisterCompanies";
import CompaniesList from "../common/pages/CompaniesList";
import CompanyDetails from "../common/pages/CompanyDetails";
import RegisterEmployees from "./pages/RegisterEmployees";
import CustomHeader from "../common/components/Header";

export default function Admin() {
  const menus = [
    {
      name: "Companies",
      items: [
        {
          name: "list",
          link: "/admin/companies/list"
        },
        {
          name: "register",
          link: "/admin/companies/register"
        }
      ]
    },
    {
      name: "Employees",
      items: [
        {
          name: "register",
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

          <Route path="/admin/company/:companyId">
            <CompanyDetails />
          </Route>
          <Route path="/admin/employees/register">
            <RegisterEmployees />
          </Route>
        </Switch>
      </Main>
    </>
  );
}
