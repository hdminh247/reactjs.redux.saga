import _ from "lodash";

export class BaseEntity {
  id;

  constructor() {
    this.id = null;
  }

  fill(data) {
    const self = this;

    _.each(data, (val, key) => {
      if (self.hasOwnProperty(key)) {
        self[key] = val;
      }
    });
    return self;
  }
}
