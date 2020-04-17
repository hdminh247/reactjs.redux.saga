import { BaseEntity } from "./base";

export class User extends BaseEntity {
  firstName;
  lastName;
  constructor() {
    super();
    this.firstName = "";
    this.lastName = "";
  }
}
