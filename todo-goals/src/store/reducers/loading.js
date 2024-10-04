import { SHARED_ACTIONS } from "../actions";

export default function loading(state = true, action) {
    switch (action.type) {
      case  SHARED_ACTIONS .RECIEVE_DATA:
        return false;
      default:
        return state;
    }
  }