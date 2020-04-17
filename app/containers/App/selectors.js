/**
 * The global state selectors
 */
import { createSelector } from "reselect";

const selectGlobal = state => state.get("global");
const selectRoute = state => state.get("route");

const makeSelectGlobalData = () =>
  createSelector(selectGlobal, globalState => globalState.toJS());
const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get("currentUser"));
const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get("loading"));
const makeSelectLoadingScript = () =>
  createSelector(selectGlobal, globalState => globalState.get("loadingScript"));
const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get("error"));
const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(["userData", "repositories"])
  );
const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get("location").toJS());
export {
  selectGlobal,
  makeSelectGlobalData,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectLoadingScript,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation
};
