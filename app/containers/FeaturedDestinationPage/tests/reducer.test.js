import { fromJS } from "immutable";
import featuredDestinationPageReducer from "../reducer";

describe("featuredDestinationPageReducer", () => {
  it("returns the initial state", () => {
    expect(featuredDestinationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
