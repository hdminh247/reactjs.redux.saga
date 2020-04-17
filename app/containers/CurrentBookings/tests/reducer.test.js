import { fromJS } from "immutable";
import currentBookingsReducer from "../reducer";

describe("currentBookingsReducer", () => {
  it("returns the initial state", () => {
    expect(currentBookingsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
