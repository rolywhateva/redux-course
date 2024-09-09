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

const store = Redux.createStore(Redux.combineReducers({todos,goals}));

function createRemoveButton(onClick) {
  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "X";

  removeBtn.addEventListener("click", onClick);

  return removeBtn;
}

function addGoalToDOM(goal) {
  const node = document.createElement("li");
  const text = document.createTextNode(goal.name);
  node.appendChild(text);
  document.getElementById("goals").appendChild(node);
}

function addTodoToDOM(todo) {
  const node = document.createElement("li");
  const text = document.createTextNode(todo.name);
  node.appendChild(text);
  node.style.textDecoration = todo.complete ? "line-through" : "none";

  node.addEventListener("click", () => {
    store.dispatch(todoActionCreators.toggle(todo.id));
  });

  const removeBtn = createRemoveButton(() =>
    store.dispatch(todoActionCreators.remove(todo.id))
  );
  node.appendChild(removeBtn);
  document.getElementById("todos").appendChild(node);
}

const unsubscribe1 = store.subscribe((newValue) => {
  const { goals, todos } = store.getState();
  console.log(newValue);
  console.log(store.getState());

  document.getElementById("todos").innerHTML = "";
  document.getElementById("goals").innerHTML = "";
  goals.forEach(addGoalToDOM);
  todos.forEach(addTodoToDOM);
});

//DOM Code

const generateUniqueId = (length = 12) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
};

function addTodo() {
  const input = document.getElementById("todo");

  const newTodo = input.value;

  input.value = "";
  store.dispatch(
    todoActionCreators.add({
      id: generateUniqueId(),
      name: newTodo,
      complete: false,
    })
  );
}

function addGoal() {
  const input = document.getElementById("goal");

  const newGoal = input.value;

  input.value = "";

  store.dispatch(
    goalActionCreators.add({
      id: generateUniqueId(),
      name: newGoal,
      complete: false,
    })
  );
}

document.getElementById("todoBtn").addEventListener("click", addTodo);
document.getElementById("goalBtn").addEventListener("click", addGoal);
