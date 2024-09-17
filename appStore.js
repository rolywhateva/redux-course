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
  RECIEVE_DATA:'RECIEVE_DATA'
};

const todoActionCreators = {
  add: (todo) => ({ type: ACTIONS.TODOS.ADD_TODO, todo }),
  remove: (id) => ({ type: ACTIONS.TODOS.REMOVE_TODO, id }),
  update: (id, todo) => ({ type: ACTIONS.TODOS.UPDATE_TODO, id, todo }),
  toggle: (id) => ({ type: ACTIONS.TODOS.TOGGLE_TODO, id }),
};

const goalActionCreators = {
  add: (goal) => ({ type: ACTIONS.GOALS.ADD_GOAL, goal }),
  remove: (id) => ({ type: ACTIONS.GOALS.REMOVE_GOAL, id }),
};

const recieveDataActionCreator = (goals,todos)=>({type:ACTIONS.RECIEVE_DATA,goals,todos});

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
    case ACTIONS.RECIEVE_DATA: 
      return action.goals;
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
    case ACTIONS.RECIEVE_DATA: 
       return action.todos;
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

// function checker(store) {
//   return function (next) {
//     return function (action) {
//       if (
//         action.type === ACTIONS.TODOS.ADD_TODO &&
//         action.todo.name.toLowerCase().indexOf("bitcoin") !== -1
//       ) {
//         return alert("Nope, that's a bad idea");
//       }

//       if (
//         action.type === ACTIONS.GOALS.ADD_GOAL &&
//         action.goal.name.toLowerCase().indexOf("bitcoin") !== -1
//       ) {
//         return alert("Nope, that's a bad idea");
//       }

//       return next(action);
//     };
//   };
// }

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

const logger = store=>next=>action=>{
    console.group(action.type);
    console.log('The action:', action);
    const result = next(action);
    console.log('The new state:',store.getState());
    console.groupEnd();
    return result;
};

const store = Redux.createStore(
  Redux.combineReducers({ todos, goals }),
  Redux.applyMiddleware(checker,logger)
);
