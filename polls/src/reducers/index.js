import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading-bar";
import polls from "./polls";
export default combineReducers({ authedUser, users,loadingBar:loadingBarReducer,polls });
