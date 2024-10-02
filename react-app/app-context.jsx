const Context = React.createContext();

class Provider extends React.Component {
  render() {
    return (
      <Context.Provider value={this.props.store}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

function connect(mapStateToProps) {
    return (MyComponent) => {
  
      class Receiver extends React.Component {
        componentDidMount() {
          const {subscribe} = this.props.store; 
  
          this.unsubscribe = subscribe(()=> this.forceUpdate());
        }
  
        componentWillUnmount() {
          this.unsubscribe();
        }
  
        render() {
          return (
            <MyComponent
              dispatch={this.props.store.dispatch}
              {...mapStateToProps(this.props.store.getState())}
            />
          );
        }
      }
  
      class ConnectedComponent extends React.Component {
        render() {
          return (
            <Context.Consumer>
              {(store) => (
                <Receiver store={store}/>
              )}
            </Context.Consumer>
          );
        }
      }
      return ConnectedComponent;
    };
  }
  