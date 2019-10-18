import React, { Component, ChangeEvent, FormEvent } from "react";
import { observer, inject } from "mobx-react";
import { TodoStore } from "../store/TodoStore";
import Todo from "../models/Todo";
import TodoComponent from "../components/TodoComponent";
import { SessionStore } from "../store/SessionStore";
import { RouteComponentProps } from "react-router";
import User, { Permission } from "../models/User";
interface Props extends RouteComponentProps {
  todoStore?: TodoStore;
  sessionStore?: SessionStore;
}

interface State {
  todoText: string;
}

@inject("todoStore")
@inject("sessionStore")
@observer
export default class TodosPage extends Component<Props, State> {
  state = { todoText: "" };

  constructor(props: Props) {
    super(props);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodoStatus = this.toggleTodoStatus.bind(this);
  }

  setStatusFilter(status: string = "") {
    this.props.todoStore!.filter.status = status;
  }

  inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    let { value }: { value: string } = event.target;
    let { name }: { name: string } = event.target;
    switch (name) {
      case "filter":
        this.props.todoStore!.filter.text = value;
        break;
      case "todoText":
        this.setState({ todoText: value });
        break;
    }
  }

  onSubmit(event: FormEvent): void {
    event.preventDefault();
    this.props.todoStore!.addTodo(this.state.todoText);
    this.setState({ todoText: "" });
  }

  deleteTodo(todo: Todo) {
    this.props.todoStore!.deleteTodo(todo);
  }

  toggleTodoStatus(todo: Todo) {
    this.props.todoStore!.toggleTodoStatus(todo);
  }

  render() {
    let {
      filteredTodos
    }: { filteredTodos: Array<Todo> } = this.props.todoStore!;

    let { user }: { user: User } = this.props.sessionStore!;

    let canDelete: boolean = this.props.sessionStore!.can(Permission.DELETE);
    let canToggle: boolean = this.props.sessionStore!.can(Permission.TOGGLE);

    let todoList = filteredTodos.map((todo, index) => {
      return (
        <TodoComponent
          todo={todo}
          key={index}
          onDelete={canDelete ? this.deleteTodo : undefined}
          onToggle={canToggle ? this.toggleTodoStatus : undefined}
        />
      );
    });

    return (
      <div style={{ padding: "2em" }}>
        <h3>Welcome back, {user.name}</h3>
        <form>
          <label>
            Search:
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="filter"
            />
          </label>
          <input
            type="radio"
            name="status"
            onClick={() => {
              this.setStatusFilter("");
            }}
          />{" "}
          Show all
          <input
            type="radio"
            name="status"
            onClick={() => {
              this.setStatusFilter("done");
            }}
          />{" "}
          Done
          <input
            type="radio"
            name="status"
            onClick={() => {
              this.setStatusFilter("in progress");
            }}
          />{" "}
          In progress
        </form>
        <ul>{todoList.length === 0 ? <h3>No todos to show</h3> : todoList}</ul>
        <form onSubmit={this.onSubmit}>
          <label>
            Add Todo
            <input
              value={this.state.todoText}
              onChange={this.inputChangeHandler}
              type="text"
              name="todoText"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
