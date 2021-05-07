import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { createReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./middlewares/saga";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middlewares = [sagaMiddleware];
  const rootReducer = createReducer();

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  const injectedReducers = {};

  store.addReducer = (key, reducer) => {
    if (!key || injectedReducers[key]) {
      return;
    }

    injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(injectedReducers));
  };

  store.removeReducer = (key) => {
    if (!key || !injectedReducers[key]) {
      return;
    }

    delete injectedReducers[key];
    store.replaceReducer(createReducer(injectedReducers));
  };

  store.runSaga = (listSagas) => {
    sagaMiddleware.run(rootSaga(listSagas));
  };

  return store;
};

export default configureStore;
