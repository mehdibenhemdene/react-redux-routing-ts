import { observable, action, computed } from "mobx";
import User, { Permission } from "../models/User";

export class SessionStore {
  @observable user: User = new User();

  @action signIn(name: string) {
    this.user = new User(name);
  }

  @computed get isSignedIn() {
    return this.user.name !== "";
  }

  can(permission: Permission) {
    return this.user.permissions.includes(permission);
  }
}

const sessionStore = new SessionStore();

export default sessionStore;
