import { all } from "redux-saga/effects";

const rootSaga = (listSagas = []) => function* () {
  yield all(listSagas);
};

export default rootSaga;
