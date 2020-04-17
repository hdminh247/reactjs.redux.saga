import { fromJS } from "immutable";
import currentDriveReducer from "../reducer";

describe("currentDriveReducer", () => {
  it("returns the initial state", () => {
    expect(currentDriveReducer(undefined, {})).toEqual(fromJS({}));
  });
});
