import React from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./admin";
import { theme } from "./common/utils/theme";

export default function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <Route path="/admin">
          <Admin />
        </Route>
      </Router>
    </Grommet>
  );
}
