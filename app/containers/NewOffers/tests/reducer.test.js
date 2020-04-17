import { fromJS } from "immutable";
import newOffersReducer from "../reducer";

describe("newOffersReducer", () => {
  it("returns the initial state", () => {
    expect(newOffersReducer(undefined, {})).toEqual(fromJS({}));
  });
});
