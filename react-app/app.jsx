class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    store.dispatch(handleInitialData());

    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    const {  loading } = this.props.store.getState();

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

class ConnectedApp extends React.Component {
  render() {
    return (
      <Context.Consumer>{(store) => <App store={store} />}</Context.Consumer>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("app")
);
