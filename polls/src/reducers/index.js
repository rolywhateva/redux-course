import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading-bar";
export default combineReducers({ authedUser, users,loadingBarReducer });
