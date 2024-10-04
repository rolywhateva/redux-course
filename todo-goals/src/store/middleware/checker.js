import { TODO_ACTIONS, GOAL_ACTIONS } from "../actions";

// eslint-disable-next-line no-unused-vars
const checker = (store) => (next) => (action) => {
  if (
    action.type === TODO_ACTIONS.ADD_TODO &&
    action.todo.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Nope, that's a bad idea");
  }

  if (
    action.type === GOAL_ACTIONS.ADD_GOAL &&
    action.goal.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Nope, that's a bad idea");
  }

  return next(action);
};

export default checker;
