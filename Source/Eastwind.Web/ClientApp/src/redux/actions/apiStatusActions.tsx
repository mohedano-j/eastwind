import * as types from "./actionTypes";

export function apiCallBegin() {
  return { type: types.API_CALL_BEGIN };
}

export function apiCallError(error: any) {
  return { type: types.API_CALL_ERROR, error: error };
}
