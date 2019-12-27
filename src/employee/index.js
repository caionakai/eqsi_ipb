import React from "react";
import { Main } from "grommet";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import CustomHeader from "../common/components/Header";
import Home from "./pages/Home";

export default function Employee() {
  const menus = [];

  return (
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
  );
}
