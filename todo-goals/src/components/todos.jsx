import React from "react";
import API from "goals-todos-api";
import { todoActionCreators } from "../store/actions/index";
import { List } from "./list";
import { useDispatch, useSelector } from "react-redux";

export default function Todos() {
  const inputRef = React.useRef("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const addItem = (e) => {
    e.preventDefault();
    return API.saveTodo(inputRef.current.value)
      .then((newTodo) => {
        dispatch(todoActionCreators.add(newTodo));

        this.input.current.value = "";
      })
      .catch(() => alert("There was an error ,try again"));
  };

  const removeItem = (item) => {
    dispatch(todoActionCreators.handleDeleteTodo(item));
  };

  const toggleItem = (item) => {
    dispatch(todoActionCreators.toggle(item.id));

    return API.saveTodoToggle(item.id).catch((reason) => {
      console.error(reason);

      alert("An error occured,  try again!");

      dispatch(todoActionCreators.toggle(item.id));
    });
  };

  return (
    <div>
      <h1> Todo List </h1>

      <input type="text" placeholder="Add Todo" ref={inputRef} />

      <button onClick={addItem}> Add Todo </button>

      <List items={todos} remove={removeItem} onClick={toggleItem} />
    </div>
  );
}
// class Todos extends React.Component {
//   addItem = (e) => {
//     e.preventDefault();

//     return API.saveTodo(this.input.value)
//       .then((newTodo) => {
//         this.props.dispatch(todoActionCreators.add(newTodo));

//         this.input.value = "";
//       })
//       .catch(() => alert("There was an error ,try again"));
//   };

//   removeItem = (item) => {
//     this.props.dispatch(todoActionCreators.handleDeleteTodo(item));
//   };

//   toggleItem = (item) => {
//     this.props.dispatch(todoActionCreators.toggle(item.id));

//     return API.saveTodoToggle(item.id).catch((reason) => {
//       console.error(reason);

//       alert("An error occured,  try again!");

//       this.props.dispatch(todoActionCreators.toggle(item.id));
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h1> Todo List </h1>

//         <input
//           type="text"
//           placeholder="Add Todo"
//           ref={(input) => (this.input = input)}
//         />

//         <button onClick={this.addItem}> Add Todo </button>

//         <List
//           items={this.props.todos}
//           remove={this.removeItem}
//           onClick={this.toggleItem}
//         />
//       </div>
//     );
//   }
// }

// const ConnectedTodos = connect((state) => ({ todos: state.todos }))(
//   Todos
// );
