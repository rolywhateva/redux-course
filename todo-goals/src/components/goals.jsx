import { useRef } from "react";
import { goalActionCreators } from "../store/actions/index";
import { List } from "./list";
import { useDispatch, useSelector } from "react-redux";

export default function Goals() {
  const input = useRef("");
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);

  const addItem = (e) => {
    e.preventDefault();
    dispatch(
      goalActionCreators.handleAddGoal(input.current.value, () => {
        input.current.value = "";
      })
    );
  };

  const removeItem = (item) => {
    dispatch(goalActionCreators.handleDeleteGoal(item));
  };

  return (
    <div>
      <h1> Goals List </h1>

      <input type="text" placeholder="Add Goal" ref={input} />

      <button onClick={addItem}> Add Goal </button>
      <List items={goals} remove={removeItem} />
    </div>
  );
}

// class Goals extends React.Component {
//   addItem = (e) => {
//     e.preventDefault();

//     this.props.dispatch(
//       goalActionCreators.handleAddGoal(this.input.value, () => {
//         this.input.value = "";
//       })
//     );
//   };

//   removeItem = (item) => {
//     this.props.dispatch(goalActionCreators.handleDeleteGoal(item));
//   };

//   render() {
//     return (
//       <div>
//         <h1> Goals List </h1>

//         <input
//           type="text"
//           placeholder="Add Goal"
//           ref={(input) => (this.input = input)}
//         />

//         <button onClick={this.addItem}> Add Goal </button>
//         <List items={this.props.goals} remove={this.removeItem} />
//       </div>
//     );
//   }
// }

// const ConnectedGoals = connect((state) => ({ goals: state.goals }))(Goals);
