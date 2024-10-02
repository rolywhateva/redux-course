class Goals extends React.Component {
  addItem = (e) => {
    e.preventDefault();

    this.props.dispatch(
      goalActionCreators.handleAddGoal(this.input.value, () => {
        this.input.value = "";
      })
    );
  };

  removeItem = (item) => {
    this.props.dispatch(goalActionCreators.handleDeleteGoal(item));
  };

  render() {
    return (
      <div>
        <h1> Goals List </h1>

        <input
          type="text"
          placeholder="Add Goal"
          ref={(input) => (this.input = input)}
        />

        <button onClick={this.addItem}> Add Goal </button>
        <List items={this.props.goals} remove={this.removeItem} />
      </div>
    );
  }
}

const ConnectedGoals = connect((state) => ({ goals: state.goals }))(Goals);
