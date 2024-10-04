import {TODO_ACTIONS,SHARED_ACTIONS} from "../actions";

export default function todos(state = [], action) {
    switch (action.type) {
      case TODO_ACTIONS.ADD_TODO:
        return state.concat([action.todo]);
      case TODO_ACTIONS.REMOVE_TODO:
        return state.filter((todo) => todo.id !== action.id);
      case TODO_ACTIONS.UPDATE_TODO:
        return state.filter((todo) =>
          todo.id !== action.id ? todo : action.todo
        );
      case TODO_ACTIONS.TOGGLE_TODO:
        return state.map((todo) =>
          todo.id !== action.id ? todo : { ...todo, complete: !todo.complete }
        );
      case SHARED_ACTIONS.RECIEVE_DATA:
        return action.todos;
      default:
        return state;
    }
  }