import { fromJS } from "immutable";
import blogDetailReducer from "../reducer";

describe("blogDetailReducer", () => {
  it("returns the initial state", () => {
    expect(blogDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
