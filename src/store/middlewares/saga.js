import { all } from "redux-saga/effects";
import { get_indentity_table_data_watcher } from "./statics/table";

const rootSaga = (listSagas = []) => function* () {
  yield all([
    get_indentity_table_data_watcher(),
    ...listSagas,
  ]);
};

export default rootSaga;
