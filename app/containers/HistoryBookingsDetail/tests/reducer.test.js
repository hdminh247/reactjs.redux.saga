import { fromJS } from "immutable";
import historyBookingsDetailReducer from "../reducer";

describe("historyBookingsDetailReducer", () => {
  it("returns the initial state", () => {
    expect(historyBookingsDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
