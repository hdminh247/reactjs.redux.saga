import { fromJS } from "immutable";
import earningPayoutReducer from "../reducer";

describe("earningPayoutReducer", () => {
  it("returns the initial state", () => {
    expect(earningPayoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
