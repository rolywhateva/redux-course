import  { useEffect } from "react";

import {  useDispatch, useSelector } from "react-redux";

import { handleInitialData } from "./store/actions/index";

import  Todos from "./components/todos";
import Goals from "./components/goals";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  if (loading) {
    return <h3> Loading... </h3>;
  }

  return (
    <div>
      <h1> React app </h1>

      <Todos />

      <Goals />
    </div>
  );
}
// class App extends React.Component {
//   componentDidMount() {
//     this.props.dispatch(handleInitialData());
//   }

//   render() {
//     const { loading } = this.props;

//     if (loading) {
//       return <h3> Loading...</h3>;
//     }

//     return (
//       <div>
//         <h1> React app </h1>

//         <ConnectedTodos />

//         <ConnectedGoals />
//       </div>
//     );
//   }
// }