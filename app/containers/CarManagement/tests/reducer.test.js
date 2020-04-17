import { fromJS } from "immutable";
import carManagementReducer from "../reducer";

describe("carManagementReducer", () => {
  it("returns the initial state", () => {
    expect(carManagementReducer(undefined, {})).toEqual(fromJS({}));
  });
});
