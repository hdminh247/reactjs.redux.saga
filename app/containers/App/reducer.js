/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from "immutable";
import { CHANGE_APP_STORE_DATA, LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_REPOS_SUCCESS, LOAD_SCRIPT_REPOS, LOAD_SCRIPT_REPOS_SUCCESS, SAVE_CURRENT_USER, UPDATE_ERROR, UPDATE_SUCCESS } from "./constants";
import _ from "lodash";
// The initial state of the App
const initialState = fromJS({
  loading: false,
  loadingScript: false,
  error: false,
  currentUser: {},
  globalError: {
    error: false,
    title: "Error!!!",
    message: "Message",
    errorCode: 0
  },
  globalSuccess: {
    visible: false,
    title: "Success!!!",
    content: "Message",
    link: ""
  }
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set("loading", true)
        .set("error", false);
    case LOAD_REPOS_SUCCESS:
      return state
        .set("loading", false);
    case LOAD_REPOS_ERROR:
      return state.set("error", true)
        .set("loading", false);

    case LOAD_SCRIPT_REPOS:
      return state
        .set("loadingScript", true);
    case LOAD_SCRIPT_REPOS_SUCCESS:
      return state.set("loadingScript", false);

    case SAVE_CURRENT_USER:
      return state.set("currentUser", action.user);

    case UPDATE_ERROR:
      return state.setIn(["globalError", "error"], action.data.error)
        .setIn(["globalError", "title"], action.data.title)
        .setIn(["globalError", "message"], action.data.message)
        .setIn(["globalError", "errorCode"], action.data.errorCode);

    case UPDATE_SUCCESS:
      const { visible = false, title = "", link = "", content = "" } = action.data;
      return state.setIn(["globalSuccess", "visible"], visible)
        .setIn(["globalSuccess", "title"], title)
        .setIn(["globalSuccess", "link"], link)
        .setIn(["globalSuccess", "content"], content);

    case CHANGE_APP_STORE_DATA:
      if (_.isArray(action.key))
        return state.setIn(action.key, fromJS(action.value));
      else
        return state.set(action.key, fromJS(action.value));

    default:
      return state;
  }
}

export default AppReducer;
