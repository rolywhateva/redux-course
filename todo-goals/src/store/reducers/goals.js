import { GOAL_ACTIONS, SHARED_ACTIONS } from "../actions";

export default function goals(state = [], action) {
  switch (action.type) {
    case GOAL_ACTIONS.ADD_GOAL:
      return state.concat([action.goal]);
    case GOAL_ACTIONS.REMOVE_GOAL:
      return state.filter((todo) => todo.id !== action.id);
    case SHARED_ACTIONS.RECIEVE_DATA:
      return action.goals;
    default:
      return state;
  }
}
