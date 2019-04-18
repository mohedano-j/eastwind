import * as types from "./actionTypes";
import * as authorApi from "../../api/categoriesApi";

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function loadCategories() {
  return function(dispatch) {
    return authorApi
      .getCategories()
      .then(categories => {
        dispatch(loadCategoriesSuccess(categories));
      })
      .catch(error => {
        throw error;
      });
  };
}
