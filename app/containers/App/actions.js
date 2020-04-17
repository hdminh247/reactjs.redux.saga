/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import { CHANGE_APP_STORE_DATA, LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_REPOS_SUCCESS, LOAD_SCRIPT_REPOS, LOAD_SCRIPT_REPOS_SUCCESS, SAVE_CURRENT_USER, UPDATE_ERROR, UPDATE_SUCCESS } from "./constants";

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded() {

  return {
    type: LOAD_REPOS_SUCCESS
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  };
}

export function saveCurrentUser(user) {
  return {
    type: SAVE_CURRENT_USER,
    user
  };
}

//-----------------ERROR POPUP---------------------
export function updateError(data) {
  return {
    type: UPDATE_ERROR,
    data
  };
}

// ------------ SUCCESS POPUP --------------------
export function updateSuccess(data) {
  return {
    type: UPDATE_SUCCESS,
    data
  };
}

export function changeAppStoreData(key, value) {
  return {
    type: CHANGE_APP_STORE_DATA,
    key, value
  };
}

export function loadScriptRepos() {
  return {
    type: LOAD_SCRIPT_REPOS
  };
}

export function reposScriptLoaded() {

  return {
    type: LOAD_SCRIPT_REPOS_SUCCESS
  };
}
