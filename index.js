const addTodo = {
    type:'ADD_TODO',
    todo:{
        id:0,
        name:'Learn Redux',
        complete:false
    }
};

const removeTodo = {
    type:'REMOVE_TODO',
    id:0 
};

const toggleTodo = {
    type:'TOGGLE_TODO',
    id:0
};


const removeGoal = {
    type:'REMOVE_GOAL',
    id:0
}

const  addGoal = {
    type:'Add_GOAL',
    id:0 
};


//Reducer function 
function todos( state=[], action) {
    if(action.type === addTodo.type) {
        return state.concat([action.todo])
    }

    return state;
}

function createStore() {
    // 1. the state 
     let state;

     let listeners = [];

    // 2. get the state 
    const getState = ()=>state;

    // 3. Listen to changes on the state, return a method to unsubscribe 
    const subscribe = (listener)=> {
        listeners.push(listener);

        return ()=> {
            listeners = listeners.filter(l=>l!==listener);
        }
    }

    // 4. update the state 
    const dispatch = (action) => {
        //call todos
        state = todos(state,action)

        // loop over listeners and invoke them 
        listeners.forEach(l=>l(state));
    }

    // 5. return the object 
    return {
        getState,
        subscribe,
        dispatch
    }
}

const store = createStore();

const unsubscribe1 = store.subscribe((newValue)=>console.log("listener number 1 receives new value",newValue));
const unsubscribe2 = store.subscribe((newValue)=>console.log("listener number 2 receives new value",newValue));
const unsubscribe3 = store.subscribe((newValue)=>console.log("listener number 3 receives new value",newValue));

store.dispatch(addTodo);
unsubscribe1();
store.dispatch(addTodo);
unsubscribe2();
store.dispatch(addTodo);
unsubscribe3();
store.dispatch(addTodo);



