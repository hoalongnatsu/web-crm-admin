import * as actions from "@Store/actions/table";

import { call, put, takeEvery } from "redux-saga/effects";

import { get_action_table } from "@Store/reducers/pattern/table";

function* get_indentity_table_data_worker(action) {
  const { identity, api, method } = action.payload;

  yield put({
    type: get_action_table(
      identity,
      actions.GET_IDENTITY_TABLE_DATA_SOURCE_REQUEST
    ),
  }); // trigger loading

  try {
    const params = {};
    const res = yield call(api[method], params);

    const payload = { dataSource: res.rows };
    yield put({
      type: get_action_table(
        identity,
        actions.GET_IDENTITY_TABLE_DATA_SOURCE_SUCCESS
      ),
      payload,
    });
  } catch (error) {
    yield put({
      type: get_action_table(
        identity,
        actions.GET_IDENTITY_TABLE_DATA_SOURCE_FAILURE
      )
    });
  }
}

export function* get_indentity_table_data_watcher() {
  yield takeEvery(
    actions.GET_IDENTITY_TABLE_DATA_SOURCE_REQUEST,
    get_indentity_table_data_worker
  );
}
