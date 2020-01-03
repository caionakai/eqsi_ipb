import React, { useEffect } from "react";
import { Main } from "grommet";
import { BrowserRouter as Switch, Route, useHistory } from "react-router-dom";

import CustomHeader from "../common/components/Header";
import Home from "./pages/Home";
import Manage from "./pages/Manage";
import { useUser } from "./hooks/user";
import { logout } from "../common/utils/logout";

export default function Employee() {
  const menus = [];
  const { isLoadingUser, isUserLoggedIn } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (!isUserLoggedIn) {
      logout().then(() => {
        history.replace("/login");
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
          homeLink="/"
          showLogout
        />
        <Main align="center">
          <Switch>
            <Route path="/calendar">
              <Manage />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Main>
      </>
    )
  );
}
