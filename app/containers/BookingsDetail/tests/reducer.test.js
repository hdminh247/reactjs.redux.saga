import { fromJS } from "immutable";
import currentBookingsDetailReducer from "../reducer";

describe("currentBookingsDetailReducer", () => {
  it("returns the initial state", () => {
    expect(currentBookingsDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
