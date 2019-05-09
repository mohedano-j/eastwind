import * as types from "../actions/actionTypes";

export default function categoryReducer(state = [], action: any) {
  switch (action.type) {
    case types.CATEGORY_LIST_LOAD_SUCCESS:
      return action.categories;
    default:
      return state;
  }
}
