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


const ConnectedApp = connect((state) => ({
  loading: state.loading,
}))(App);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("app")
);
