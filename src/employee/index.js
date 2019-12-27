import React, { useEffect } from "react";
import { Main } from "grommet";
import { BrowserRouter as Switch, Route, useHistory } from "react-router-dom";

import CustomHeader from "../common/components/Header";
import Home from "./pages/Home";
import { useUser } from "./hooks/user";

export default function Employee() {
  const menus = [];
  const { isLoadingUser, isUserLoggedIn } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (!isUserLoggedIn) {
      history.replace("/login");
      history.go();
    }
  }, [history, isUserLoggedIn]);

  return (
    !isLoadingUser && (
      <>
        <CustomHeader brandLabel="Dashboard" menus={menus} homeLink="/home" />
        <Main pad="large" align="center">
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Main>
      </>
    )
  );
}
