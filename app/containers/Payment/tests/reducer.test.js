import { fromJS } from "immutable";
import paymentReducer from "../reducer";

describe("paymentReducer", () => {
  it("returns the initial state", () => {
    expect(paymentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
