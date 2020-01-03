import React from "react";
import { deepMerge } from "grommet/utils";
import { Grommet, grommet } from "grommet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Admin from "./admin";
import { theme } from "./common/utils/theme";
import Employee from "./employee";
import LoginPage from "./common/pages/Login";

export default function App() {
  const employeeLoginText = "Employee Login";
  const adminLoginText = "Admin Login";
  return (
    <Grommet theme={deepMerge(grommet, theme)}>
      <Router>
        <Switch>
          <Route path="/admin/login">
            <LoginPage
              to="/admin"
              brandLabel="Login"
              text={adminLoginText}
              isAdmin
            />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/login">
            <LoginPage to="/" brandLabel="Login" text={employeeLoginText} />
          </Route>
          <Route path="/">
            <Employee />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
}
