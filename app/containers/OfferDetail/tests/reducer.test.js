import { fromJS } from "immutable";
import offerDetailReducer from "../reducer";

describe("offerDetailReducer", () => {
  it("returns the initial state", () => {
    expect(offerDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
