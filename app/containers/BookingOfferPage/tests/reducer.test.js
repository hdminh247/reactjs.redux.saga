import { fromJS } from "immutable";
import bookingOfferReducer from "../reducer";

describe("bookingOfferReducer", () => {
  it("returns the initial state", () => {
    expect(bookingOfferReducer(undefined, {})).toEqual(fromJS({}));
  });
});
