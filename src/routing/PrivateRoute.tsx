import React, { Component, ComponentType } from "react";
import { SessionStore } from "../store/SessionStore";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { inject } from "mobx-react";

interface Props {
  sessionStore?: SessionStore;
  component: ComponentType<RouteComponentProps<any>>;
  path: string;
}
interface State {}
@inject("sessionStore")
export default class PrivateRoute extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Route
        render={props =>
          this.props.sessionStore!.isSignedIn === true ? (
            React.createElement(this.props.component, props)
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}
