function createStore(reducer) {
  // 1. the state
  let state;

  let listeners = [];

  // 2. get the state
  const getState = () => state;

  // 3. Listen to changes on the state, return a method to unsubscribe
  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // 4. update the state
  const dispatch = (action) => {
    //call todos
    state = reducer(state, action);
    console.log(state);

    // loop over listeners and invoke them
    listeners.forEach((l) => l(state));
  };

  // 5. return the object
  return {
    getState,
    subscribe,
    dispatch,
  };
}

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

const store = createStore(app);

const unsubscribe1 = store.subscribe((newValue) =>
  console.log("listener number 1 receives new value", newValue)
);
//const unsubscribe2 = store.subscribe((newValue)=>console.log("listener number 2 receives new value",newValue));
//const unsubscribe3 = store.subscribe((newValue)=>console.log("listener number 3 receives new value",newValue));

//store.dispatch({ type: "ADD_GOAL", goal: { id: 1, name: "something" } });

store.dispatch(
  todoActionCreators.add({ id: 1, name: "something", complete: false })
);
store.dispatch(todoActionCreators.toggle(1));
