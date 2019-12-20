import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import RegisterCompanies from "./pages/RegisterCompanies";
import CompaniesList from "../common/pages/CompaniesList";
import CompanyDetails from "../common/pages/CompanyDetails";

export default function Admin() {
  return (
    <>
      HEADER
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
      </Switch>
    </>
  );
}
