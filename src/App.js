import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./admin";

export default function App() {
  return (
    <>
      <Router>
        <Route path="/admin">
          <Admin />
        </Route>
      </Router>
    </>
  );
}
