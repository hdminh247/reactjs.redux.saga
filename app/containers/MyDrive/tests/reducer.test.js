import { fromJS } from "immutable";
import myDriveReducer from "../reducer";

describe("myDriveReducer", () => {
  it("returns the initial state", () => {
    expect(myDriveReducer(undefined, {})).toEqual(fromJS({}));
  });
});
