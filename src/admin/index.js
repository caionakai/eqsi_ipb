import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import RegisterCompanies from "./pages/RegisterCompanies";

export default function Admin() {
  return (
    <>
      HEADER
      <Switch>
        <Route path="/admin/companies/register">
          <RegisterCompanies />
        </Route>
      </Switch>
    </>
  );
}
