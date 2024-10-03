import * as ReduxThunk from "redux-thunk";
import * as Redux  from "redux";

import { todos, goals, loading } from "./reducers";
import { checker, logger } from "./middlewares";

console.log(ReduxThunk);
const store = Redux.createStore(
  Redux.combineReducers({ todos, goals, loading }),
  Redux.applyMiddleware(checker, logger, ReduxThunk.thunk)
);

export { store };
