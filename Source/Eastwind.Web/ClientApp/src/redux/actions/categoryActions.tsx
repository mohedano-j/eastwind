import * as types from "./actionTypes";
import { CategoryService } from "../../api/categoriesApi";
import { apiCallBegin, apiCallError } from "./apiStatusActions";
import { Category } from "../../entities/category";
export function categoryListLoadSuccess(categories: any) {
  return { type: types.CATEGORY_LIST_LOAD_SUCCESS, categories };
}

export function categoryListLoad() {
  return function(dispatch: any) {
    dispatch(apiCallBegin());
    var categoryService = new CategoryService();
    return categoryService.getAll().subscribe(
      (categories: Category[]) => {
        dispatch(categoryListLoadSuccess(categories));
      },
      error => {
        dispatch(apiCallError(error.message));
      }
    );
  };
}
