import API from "goals-todos-api";

const TODO_ACTIONS = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
};

/* Thunks */

const handleAddTodo = (todoName, cb) => (dispatch) => {
  return API.saveTodo(todoName)
    .then((newTodo) => {
      dispatch(todoActionCreators.add(newTodo));

      cb();
    })
    .catch(() => alert("There was an error ,try again"));
};

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

const handleToggleTodo = (todo) => (dispatch) => {
  const toggle = () => dispatch(todoActionCreators.toggle(todo.id));

  toggle();

  return API.saveTodoToggle(todo.id).catch((reason) => {
    console.error(reason);

    alert("An error occured, try again!");

    toggle();
  });
};

// action creators
const todoActionCreators = {
  add: (todo) => ({ type: TODO_ACTIONS.ADD_TODO, todo }),
  remove: (id) => ({ type: TODO_ACTIONS.REMOVE_TODO, id }),
  update: (id, todo) => ({ type: TODO_ACTIONS.UPDATE_TODO, id, todo }),
  toggle: (id) => ({ type: TODO_ACTIONS.TOGGLE_TODO, id }),
  handleDeleteTodo,
  handleAddTodo,
  handleToggleTodo,
};

export { TODO_ACTIONS, todoActionCreators };
