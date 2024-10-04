import API from "goals-todos-api";

const GOAL_ACTIONS = {
  ADD_GOAL: "ADD_GOAL",
  REMOVE_GOAL: "REMOVE_GOAL",
};

//Thunks
const handleDeleteGoal = (goal) => {
  return (dispatch) => {
    dispatch(goalActionCreators.remove(goal.id));

    return API.deleteGoal(goal.id).catch((reason) => {
      console.error(reason);
      alert("Something went wrong, please try again!");
      dispatch(goalActionCreators.add(goal));
    });
  };
};

const handleAddGoal = (name, cb) => {
  return (dispatch) => {
    return API.saveGoal(name)
      .then((newGoal) => {
        dispatch(goalActionCreators.add(newGoal));
        cb();
      })
      .catch(() => alert("Something went wrong, please try again!"));
  };
};

//Action creators
const goalActionCreators = {
  add: (goal) => ({ type: GOAL_ACTIONS.ADD_GOAL, goal }),
  remove: (id) => ({ type: GOAL_ACTIONS.REMOVE_GOAL, id }),
  handleDeleteGoal,
  handleAddGoal,
};

export { GOAL_ACTIONS, goalActionCreators };
