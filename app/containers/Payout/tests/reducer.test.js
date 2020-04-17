import { fromJS } from "immutable";
import payoutReducer from "../reducer";

describe("payoutReducer", () => {
  it("returns the initial state", () => {
    expect(payoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
