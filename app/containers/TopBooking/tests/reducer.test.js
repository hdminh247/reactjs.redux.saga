import { fromJS } from "immutable";
import topBookingReducer from "../reducer";

describe("topBookingReducer", () => {
  it("returns the initial state", () => {
    expect(topBookingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
