import React from "react";
import { Main } from "grommet";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import LoginPage from "../common/pages/Login";

export default function Admin() {
  return (
    <>
      <Main pad="large" align="center">
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Main>
    </>
  );
}
