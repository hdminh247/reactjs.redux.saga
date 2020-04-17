import { BaseEntity } from "./base";

export class User extends BaseEntity {
  type;
  latitude;
  
  constructor() {
    super();
    this.firstName = "";
    this.lastName = "";
  }
}
