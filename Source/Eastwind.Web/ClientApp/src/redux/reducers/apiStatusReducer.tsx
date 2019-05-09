import * as types from "../actions/actionTypes";

function actionTypeEndsInSuccess(type: string) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(state = 0, action: any) {
  if (action.type == types.API_CALL_BEGIN) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}
