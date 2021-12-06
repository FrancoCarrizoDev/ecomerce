import { testReducer } from "reducers/testReducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  test: testReducer,
});

export const store = createStore(
  reducers /* preloadedState, */,
  composeEnhancers(applyMiddleware(thunk))
);
