import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { GlobalProvider } from "context/store/store";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import {
  HomePage,
  ProductionReport,
  ProductionForm,
  UserRegistration,
  QualityReport,
  QualityForm,
  Login,
} from "views/Pages";

var hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/production-report" component={ProductionReport} />
        <Route path="/production-form" component={ProductionForm} />
        <Route path="/user-registration" component={UserRegistration} />
        <Route path="/quality-report" component={QualityReport} />
        <Route path="/quality-form" component={QualityForm} />
        <Route path="/home" component={HomePage} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default GlobalProvider(App);
