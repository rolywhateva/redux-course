import {ACTIONS} from './actions';

// eslint-disable-next-line no-unused-vars
const checker = (store) => (next) => (action) => {
  if (
    action.type === ACTIONS.TODOS.ADD_TODO &&
    action.todo.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Nope, that's a bad idea");
  }

  if (
    action.type === ACTIONS.GOALS.ADD_GOAL &&
    action.goal.name.toLowerCase().indexOf("bitcoin") !== -1
  ) {
    return alert("Nope, that's a bad idea");
  }

  return next(action);
};

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The action:", action);
  const result = next(action);
  console.log("The new state:", store.getState());
  console.groupEnd();
  return result;
};

export {checker,logger};
