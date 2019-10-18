import { observable, action, computed } from "mobx";
import Todo from "../models/Todo";

export interface TodoFilter {
  text: string;
  status: string;
}

export class TodoStore {
  @observable todos: Array<Todo> = [];
  @observable filter: TodoFilter = {
    text: "",
    status: ""
  };
  constructor() {
    let todo1 = new Todo("Buy milk");
    let todo2 = new Todo("Buy eggs");
    this.todos = [todo1, todo2];
  }

  @computed get filteredTodos(): Array<Todo> {
    return this.todos.filter(
      el =>
        el.label.includes(this.filter.text) &&
        el.status.includes(this.filter.status)
    );
  }

  @action addTodo(label: string, status: string = "in progress") {
    this.todos.push(new Todo(label, status));
  }

  @action deleteTodo(todo: Todo) {
    const toDelete: number = this.todos.findIndex(t => t.label === todo.label);
    if (toDelete !== -1) {
      this.todos.splice(toDelete, 1);
    }
  }

  @action toggleTodoStatus(todo: Todo) {
    const updatedIndex: number = this.todos.findIndex(
      t => t.label === todo.label
    );
    if (updatedIndex !== -1) {
      const toUpdate: Todo = this.todos[updatedIndex];
      this.todos[updatedIndex] = new Todo(
        toUpdate.label,
        toUpdate.status === "done" ? "in progress" : "done"
      );
    }
  }
}

var store = new TodoStore();

export default store;
