import { fromJS } from "immutable";
import otherPageReducer from "../reducer";

describe("otherPageReducer", () => {
  it("returns the initial state", () => {
    expect(otherPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
