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
    const name = this.input.value;
    this.input.value = "";

    this.props.store.dispatch(
      todoActionCreators.add({ id: generateUniqueId(), name, complete: false })
    );
  };

  removeItem = (item) => {
    this.props.store.dispatch(todoActionCreators.remove(item.id));
  };

  toggleItem = (item) => {
    this.props.store.dispatch(todoActionCreators.toggle(item.id));
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
    const name = this.input.value;
    this.input.value = "";

    this.props.store.dispatch(
      goalActionCreators.add({ id: generateUniqueId(), name, complete: false })
    );
  };

  removeItem = (item) => {
    this.props.store.dispatch(goalActionCreators.remove(item.id));
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

    store.subscribe(() => {
      this.forceUpdate();
    });
    Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
      store.dispatch(recieveDataActionCreator(goals, todos));
    });
  }

  render() {
    const { todos, goals } = this.props.store.getState();

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
