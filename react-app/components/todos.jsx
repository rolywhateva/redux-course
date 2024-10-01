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
  