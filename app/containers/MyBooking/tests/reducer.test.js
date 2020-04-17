import { fromJS } from "immutable";
import myBookingReducer from "../reducer";

describe("myBookingReducer", () => {
  it("returns the initial state", () => {
    expect(myBookingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
