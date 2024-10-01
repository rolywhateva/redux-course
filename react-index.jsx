function List(props) {
  return (
    <ul>
      {props.items.map((item, key) => (
        <li key={key}>
          <span
            onClick={() => props.onClick && props.onClick(item)}
            style={{ textDecoration: item.complete ? "line-through" : "none" }}
          >
            {item.name}
          </span>

          <button
            onClick={() => {
              props.remove(item);
            }}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}

class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault();

    return API.saveTodo(this.input.value)
      .then((newTodo) => {
        this.props.store.dispatch(todoActionCreators.add(newTodo));

        this.input.value = "";
      })
      .catch(() => alert("There was an error ,try again"));
  };

  removeItem = (item) => {
    this.props.store.dispatch(todoActionCreators.handleDeleteTodo(item));
  };

  toggleItem = (item) => {
    this.props.store.dispatch(todoActionCreators.toggle(item.id));

    return API.saveTodoToggle(item.id).catch((reason) => {
      console.error(reason);

      alert("An error occured,  try again!");

      this.props.store.dispatch(todoActionCreators.toggle(item.id));
    });
  };

  render() {
    return (
      <div>
        <h1> Todo List </h1>

        <input
          type="text"
          placeholder="Add Todo"
          ref={(input) => (this.input = input)}
        />

        <button onClick={this.addItem}> Add Todo </button>

        <List
          items={this.props.todos}
          remove={this.removeItem}
          onClick={this.toggleItem}
        />
      </div>
    );
  }
}

class Goals extends React.Component {
  addItem = (e) => {
    e.preventDefault();

    this.props.store.dispatch(
      goalActionCreators.handleAddGoal(this.input.value, () => {
        this.input.value = "";
      })
    );
  };

  removeItem = (item) => {
    this.props.store.dispatch(goalActionCreators.handleDeleteGoal(item));
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

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    store.dispatch(handleInitialData());

    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    const { todos, goals, loading } = this.props.store.getState();

    if (loading) {
      return <h3> Loading...</h3>;
    }

    return (
      <div>
        <h1> React app </h1>
        <Todos todos={todos} store={this.props.store} />

        <Goals goals={goals} store={this.props.store} />
      </div>
    );
  }
}

ReactDOM.render(<App store={store} />, document.getElementById("app"));
