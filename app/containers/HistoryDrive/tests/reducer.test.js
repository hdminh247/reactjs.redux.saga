import { fromJS } from "immutable";
import historyDriveReducer from "../reducer";

describe("historyDriveReducer", () => {
  it("returns the initial state", () => {
    expect(historyDriveReducer(undefined, {})).toEqual(fromJS({}));
  });
});
