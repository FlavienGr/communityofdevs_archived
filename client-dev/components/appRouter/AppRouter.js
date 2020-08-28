import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "../Header";
import IndexPage from "../IndexPage";
import PublicRoute from "./PublicRoute";
import NoFound from "../NoFound";

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PublicRoute path='/' component={LoginPage} exact={true} />
        <Route component={NoFound} />
      </Switch>
    </div>
  </Router>
);
export default AppRouter;
