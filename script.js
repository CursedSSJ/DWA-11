const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {
        ...state,
        value: Math.min(state.value + 1),
      };
    case ACTIONS.DECREMENT:
      return {
        ...state,
        value: Math.max(state.value - 1),
      };
    case ACTIONS.RESET:
      return { ...state, value: 0 };
    default:
      return state;
  }
}

function createStore(reducer) {
  let state = { value: 0 };
  const observers = [];

  const subscribe = (observer) => {
    observers.push(observer);
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    observers.forEach((observer) => observer());
  };

  const getState = () => state;

  return { subscribe, dispatch, getState };
}

const store = createStore(reducer);

store.subscribe(() => {
  const state = store.getState();
});

const subtractHandler = () => {
  store.dispatch({ type: ACTIONS.DECREMENT });
};

const addHandler = () => {
  store.dispatch({ type: ACTIONS.INCREMENT });
};

const resetHandler = () => {
  store.dispatch({ type: ACTIONS.RESET });
};

console.log("Initial state:", store.getState());
addHandler();
addHandler();
console.log("Add Handler has been run twice:", store.getState());
subtractHandler();
console.log("Subtract Handler has been run once:", store.getState());
resetHandler();
console.log("Reset Handler has been run once:", store.getState());
