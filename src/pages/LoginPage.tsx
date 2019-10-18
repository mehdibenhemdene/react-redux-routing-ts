import React, { Component, ChangeEvent, FormEvent } from "react";
import { SessionStore } from "../store/SessionStore";
import { observer, inject } from "mobx-react";
import { RouteComponentProps } from "react-router";
interface Props extends RouteComponentProps {
  sessionStore?: SessionStore;
}
interface State {
  name: string;
}

@inject("sessionStore")
@observer
export default class LoginPage extends Component<Props, State> {
  state = {
    name: ""
  };

  constructor(props: Props) {
    super(props);
    this.onNameChanged = this.onNameChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNameChanged(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: event.target.value
    });
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    this.props.sessionStore!.signIn(this.state.name);
    this.props.history.push("/todos");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Please login to continue
            <input
              type="text"
              name="name"
              onChange={this.onNameChanged}
              placeholder="Enter your full name"
            />
          </label>
        </form>
      </div>
    );
  }
}
