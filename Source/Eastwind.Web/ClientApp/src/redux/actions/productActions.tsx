import * as types from "./actionTypes";
import * as productsApi from "../../api/productsApi";
import { apiCallBegin, apiCallError } from "./apiStatusActions";
import { orderBy } from "lodash";

export function productListLoadSuccess(products: any) {
  return { type: types.PRODUCT_LIST_LOAD_SUCCESS, products };
}

export function productListSortSuccess(products: any) {
  return { type: types.PRODUCT_LIST_SORT_SUCCESS, products };
}

export function productAddSuccess(product: any) {
  return { type: types.PRODUCT_ADD_SUCCESS, product };
}

export function productEditSuccess(product: any) {
  return { type: types.PRODUCT_EDIT_SUCCESS, product };
}

export function productDeleteSuccess(product: any) {
  return { type: types.PRODUCT_DELETE_SUCCESS, product };
}

export function productListLoad() {
  return function(dispatch: any) {
    dispatch(apiCallBegin());
    return productsApi
      .productListGet()
      .then(products => {
        dispatch(productListLoadSuccess(products));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function productListSort(
  products: Array<any>,
  field: string,
  asc: boolean
) {
  const sortedProducts = orderBy(products, field, asc);
  return productListSortSuccess(sortedProducts);
}

export function productAdd(product: any) {
  return function(dispatch: any) {
    dispatch(apiCallBegin());
    return productsApi
      .productAdd(product)
      .then(addedProduct => {
        dispatch(productAddSuccess(addedProduct));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function productEdit(product: any) {
  return function(dispatch: any) {
    dispatch(apiCallBegin());
    return productsApi
      .productEdit(product)
      .then(editedProduct => {
        dispatch(productEditSuccess(editedProduct));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function productDelete(product: any) {
  return function(dispatch: any) {
    dispatch(apiCallBegin());
    return productsApi
      .productDelete(product)
      .then(deletedProduct => {
        dispatch(productDeleteSuccess(deletedProduct));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
