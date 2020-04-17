import { fromJS } from "immutable";
import promotionDetailReducer from "../reducer";

describe("promotionDetailReducer", () => {
  it("returns the initial state", () => {
    expect(promotionDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
