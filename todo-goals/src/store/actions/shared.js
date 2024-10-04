import API from "goals-todos-api";

const SHARED_ACTIONS = {
  RECIEVE_DATA: "RECIEVE_DATA",
};

const recieveDataActionCreator = (goals, todos) => ({
  type: SHARED_ACTIONS.RECIEVE_DATA,
  goals,
  todos,
});

const handleInitialData = () => (dispatch) =>
  Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
    dispatch(recieveDataActionCreator(goals, todos));
  });

export { handleInitialData,SHARED_ACTIONS };
