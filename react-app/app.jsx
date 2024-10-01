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
