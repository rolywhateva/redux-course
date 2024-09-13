// Example of a store, this is finally unused
function createStore(reducer) {
    // 1. the state
    let state;
  
    let listeners = [];
  
    // 2. get the state
    const getState = () => state;
  
    // 3. Listen to changes on the state, return a method to unsubscribe
    const subscribe = (listener) => {
      listeners.push(listener);
  
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    };
  
    // 4. update the state
    const dispatch = (action) => {
      //call todos
      state = reducer(state, action);
      console.log(state);
  
      // loop over listeners and invoke them
      listeners.forEach((l) => l(state));
    };
  
    // 5. return the object
    return {
      getState,
      subscribe,
      dispatch,
    };
  }
  