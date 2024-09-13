function createRemoveButton(onClick) {
  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "X";

  removeBtn.addEventListener("click", onClick);

  return removeBtn;
}

function addGoalToDOM(goal) {
  const node = document.createElement("li");
  const text = document.createTextNode(goal.name);
  node.appendChild(text);
  document.getElementById("goals").appendChild(node);
}

function addTodoToDOM(todo) {
  const node = document.createElement("li");
  const text = document.createTextNode(todo.name);
  node.appendChild(text);
  node.style.textDecoration = todo.complete ? "line-through" : "none";

  node.addEventListener("click", () => {
    store.dispatch(todoActionCreators.toggle(todo.id));
  });

  const removeBtn = createRemoveButton(() =>
    store.disaptch(todoActionCreators.remove(todo.id))
  );
  node.appendChild(removeBtn);
  document.getElementById("todos").appendChild(node);
}

function addTodo() {
  const input = document.getElementById("todo");

  const newTodo = input.value;

  input.value = "";
  store.dispatch(
    todoActionCreators.add({
      id: generateUniqueId(),
      name: newTodo,
      complete: false,
    })
  );
}

function addGoal() {
  const input = document.getElementById("goal");

  const newGoal = input.value;

  input.value = "";

  store.dispatch(
    goalActionCreators.add({
      id: generateUniqueId(),
      name: newGoal,
      complete: false,
    })
  );
}

store.subscribe(() => {
  const { goals, todos } = store.getState();

  document.getElementById("todos").innerHTML = "";
  document.getElementById("goals").innerHTML = "";

  goals.forEach(addGoalToDOM);
  todos.forEach(addTodoToDOM);
});

document.getElementById("todoBtn").addEventListener("click", addTodo);
document.getElementById("goalBtn").addEventListener("click", addGoal);
