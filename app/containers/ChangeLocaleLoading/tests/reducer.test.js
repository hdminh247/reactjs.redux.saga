import { fromJS } from "immutable";
import changeLocaleLoadingReducer from "../reducer";

describe("changeLocaleLoadingReducer", () => {
  it("returns the initial state", () => {
    expect(changeLocaleLoadingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
