import { fromJS } from "immutable";
import promotionListReducer from "../reducer";

describe("promotionListReducer", () => {
  it("returns the initial state", () => {
    expect(promotionListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
