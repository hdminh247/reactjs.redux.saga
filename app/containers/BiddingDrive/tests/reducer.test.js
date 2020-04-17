import { fromJS } from "immutable";
import biddingDriveReducer from "../reducer";

describe("biddingDriveReducer", () => {
  it("returns the initial state", () => {
    expect(biddingDriveReducer(undefined, {})).toEqual(fromJS({}));
  });
});
