import { combineReducers } from "redux";
import errors from "./statics/errors";
import loading from "./statics/loading";

export function createReducer(reducers) {
  return combineReducers({
    loading,
    errors,
    ...reducers,
  });
}
