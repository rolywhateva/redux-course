import API from "goals-todos-api";

const ACTIONS = {
  TODOS: {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",
    UPDATE_TODO: "UPDATE_TODO",
    TOGGLE_TODO: "TOGGLE_TODO",
  },
  GOALS: {
    ADD_GOAL: "ADD_GOAL",
    REMOVE_GOAL: "REMOVE_GOAL",
  },
  RECIEVE_DATA: "RECIEVE_DATA",
};

const recieveDataActionCreator = (goals, todos) => ({
    type: ACTIONS.RECIEVE_DATA,
    goals,
    todos,
  });

const handleInitialData = () => (dispatch) =>
  Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
    dispatch(recieveDataActionCreator(goals, todos));
  });

const handleDeleteTodo = (todo) => {
  return (dispatch) => {
    dispatch(todoActionCreators.remove(todo.id));

    return API.deleteTodo(todo.id).catch((reason) => {
      console.error(reason);

      alert("An error occured, try again");

      dispatch(todoActionCreators.add(todo));
    });
  };
};

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

const todoActionCreators = {
  add: (todo) => ({ type: ACTIONS.TODOS.ADD_TODO, todo }),
  remove: (id) => ({ type: ACTIONS.TODOS.REMOVE_TODO, id }),
  update: (id, todo) => ({ type: ACTIONS.TODOS.UPDATE_TODO, id, todo }),
  toggle: (id) => ({ type: ACTIONS.TODOS.TOGGLE_TODO, id }),
  handleDeleteTodo,
};

const goalActionCreators = {
  add: (goal) => ({ type: ACTIONS.GOALS.ADD_GOAL, goal }),
  remove: (id) => ({ type: ACTIONS.GOALS.REMOVE_GOAL, id }),
  handleDeleteGoal,
  handleAddGoal,
};

export {ACTIONS,todoActionCreators,goalActionCreators,handleInitialData};



