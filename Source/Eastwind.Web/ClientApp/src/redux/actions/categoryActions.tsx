import * as types from "./actionTypes";
import * as categoriesApi from "../../api/categoriesApi";
import { apiCallBegin, apiCallError } from "./apiStatusActions";

export function categoryListLoadSuccess(categories: any) {
  return { type: types.CATEGORY_LIST_LOAD_SUCCESS, categories };
}

export function categoryListLoad() {
  return function(dispatch: any) {
    dispatch(apiCallBegin());
    return categoriesApi
      .categoryListLoad()
      .then(categories => {
        dispatch(categoryListLoadSuccess(categories));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
