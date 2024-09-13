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
};

const todoActionCreators = {
  add: (todo) => ({ type: ACTIONS.TODOS.ADD_TODO, todo }),
  remove: (id) => ({ type: ACTIONS.TODOS.REMOVE_TODO, id }),
  update: (id, todo) => ({ type: ACTIONS.TODOS.UPDATE_TODO, id, todo }),
  toggle: (id) => ({ type: ACTIONS.TODOS.TOGGLE_TODO, id }),
};

const goalActionCreators = {
  add: (goal) => ({ type: ACTIONS.GOALS.ADD_GOAL, goal }),
  remove: (id) => ({ type: ACTIONS.TODOS.REMOVE_TODO, id }),
};

function addTodoAction(todo) {
  return {
    type: ACTIONS.TODOS.ADD_TODO,
    todo,
  };
}

function goals(state = [], action) {
  switch (action.type) {
    case ACTIONS.GOALS.ADD_GOAL:
      return state.concat([action.goal]);
    case ACTIONS.GOALS.REMOVE_GOAL:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

//Reducer function
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
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = Redux.createStore(Redux.combineReducers({ todos, goals }));
