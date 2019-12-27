import React from "react";
import { deepMerge } from "grommet/utils";
import { Grommet, grommet } from "grommet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Admin from "./admin";
import Common from "./common";
import { theme } from "./common/utils/theme";
import Employee from "./employee";

export default function App() {
  return (
    <Grommet theme={deepMerge(grommet, theme)}>
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/login">
            <Common />
          </Route>
          <Route path="/">
            <Employee />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
}
