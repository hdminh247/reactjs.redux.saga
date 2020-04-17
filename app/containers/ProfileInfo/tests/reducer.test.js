import { fromJS } from "immutable";
import profileInforReducer from "../reducer";

describe("profileInforReducer", () => {
  it("returns the initial state", () => {
    expect(profileInforReducer(undefined, {})).toEqual(fromJS({}));
  });
});
