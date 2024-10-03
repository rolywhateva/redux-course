import { ACTIONS } from "./actions";

function goals(state = [], action) {
  switch (action.type) {
    case ACTIONS.GOALS.ADD_GOAL:
      return state.concat([action.goal]);
    case ACTIONS.GOALS.REMOVE_GOAL:
      return state.filter((todo) => todo.id !== action.id);
    case ACTIONS.RECIEVE_DATA:
      return action.goals;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ACTIONS.TODOS.ADD_TODO:
      return state.concat([action.todo]);
    case ACTIONS.TODOS.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case ACTIONS.TODOS.UPDATE_TODO:
      return state.filter((todo) =>
        todo.id !== action.id ? todo : action.todo
      );
    case ACTIONS.TODOS.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id ? todo : { ...todo, complete: !todo.complete }
      );
    case ACTIONS.RECIEVE_DATA:
      return action.todos;
    default:
      return state;
  }
}

function loading(state = true, action) {
  switch (action.type) {
    case ACTIONS.RECIEVE_DATA:
      return false;
    default:
      return state;
  }
}

export { loading, todos, goals };
