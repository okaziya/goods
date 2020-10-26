import uuid from "../lib/uuid";

export default class Model {
  constructor(data) {
    this.id = uuid();
    Object.assign(this, data);
  }
}
