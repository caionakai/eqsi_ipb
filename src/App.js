import React from "react";
import { deepMerge } from "grommet/utils";
import { Grommet, grommet } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./admin";
import Common from "./common";
import { theme } from "./common/utils/theme";

export default function App() {
  return (
    <Grommet theme={deepMerge(grommet, theme)}>
      <Router>
        <Route exact path="/">
          <Common />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Router>
    </Grommet>
  );
}
