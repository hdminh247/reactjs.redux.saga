import { fromJS } from "immutable";
import helpReducer from "../reducer";

describe("helpReducer", () => {
  it("returns the initial state", () => {
    expect(helpReducer(undefined, {})).toEqual(fromJS({}));
  });
});
