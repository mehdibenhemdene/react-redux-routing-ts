import React, { Component } from "react";
import Todo from "../models/Todo";
interface Props {
  todo: Todo;
  onDelete?: (todo: Todo) => void;
  onToggle?: (todo: Todo) => void;
}
interface State {}

export default class TodoComponent extends Component<Props, State> {
  state = {};

  render(): JSX.Element {
    let { todo, onDelete, onToggle } = this.props!;

    return (
      <li>
        {todo.label}{" "}
        <button
          disabled={!onDelete}
          onClick={() => {
            onDelete!(todo);
          }}
        >
          Delete
        </button>
        <button
          disabled={!onToggle}
          onClick={() => {
            onToggle!(todo);
          }}
        >
          {todo.status === "done" ? "Mark as undone" : "Mark as done"}
        </button>
      </li>
    );
  }
}
