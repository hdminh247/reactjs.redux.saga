import { fromJS } from "immutable";
import stepSignUpReducer from "../reducer";

describe("stepSignUpReducer", () => {
  it("returns the initial state", () => {
    expect(stepSignUpReducer(undefined, {})).toEqual(fromJS({}));
  });
});
