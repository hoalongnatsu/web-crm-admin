import admin from "./statics/admin";
import { combineReducers } from "redux";
import errors from "./statics/errors";
import loading from "./statics/loading";

export function createReducer(reducers) {
  return combineReducers({
    admin,
    errors,
    loading,
    ...reducers,
  });
}
