export enum Permission {
  "DELETE",
  "TOGGLE"
}

export default class User {
  constructor(
    public name: string = "",
    public permissions: Array<Permission> = []
  ) {
    // Try to comment these and test output
    this.permissions = [Permission.DELETE, Permission.TOGGLE];
  }
}
