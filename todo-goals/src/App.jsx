import  React  from "react";

import {connect} from "react-redux";

import { handleInitialData } from "./store/actions";

import { ConnectedTodos } from "./components/todos";
import { ConnectedGoals } from "./components/goals";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <h3> Loading...</h3>;
    }

    return (
      <div>
        <h1> React app </h1>

        <ConnectedTodos />

        <ConnectedGoals />
      </div>
    );
  }
}

export const ConnectedApp = connect((state) => ({
  loading: state.loading,
}))(App);
