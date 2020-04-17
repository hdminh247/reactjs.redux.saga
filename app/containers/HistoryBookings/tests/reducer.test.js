import { fromJS } from "immutable";
import historyBookingsReducer from "../reducer";

describe("historyBookingsReducer", () => {
  it("returns the initial state", () => {
    expect(historyBookingsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
