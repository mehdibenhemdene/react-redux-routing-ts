export default class Todo {
  label: string;
  status: string;

  constructor(label: string = "", status: string = "in progress") {
    this.label = label;
    this.status = status;
  }
}
