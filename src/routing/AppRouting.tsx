import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TodosPage from "../pages/TodosPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
interface Props {}
interface State {}

export default class AppRouting extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute path="/todos" component={TodosPage} />
        </Switch>
      </Router>
    );
  }
}
