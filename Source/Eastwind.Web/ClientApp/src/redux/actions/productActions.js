import * as types from "./actionTypes";
import * as productsApi from "../../api/productsApi";
import { orderBy } from "lodash";

export function loadProductsSuccess(products) {
    return { type: types.LOAD_PRODUCTS_SUCCESS, products };
  }
  export function loadProductSuccess(product) {
    return { type: types.LOAD_PRODUCT_SUCCESS, product };
  }
  
  export function createProductSuccess(product) {
    return { type: types.CREATE_PRODUCT_SUCCESS, product };
  }
  
  export function updateProductSuccess(product) {
    return { type: types.UPDATE_PRODUCT_SUCCESS, product };
  }

  export function loadProducts() {
    return function(dispatch) {
      return productsApi
        .getProducts()
        .then(products => {
          dispatch(loadProductsSuccess(products));
        })
        .catch(error => {
          throw error;
        });
    };
  }

  export function loadProduct(productId) {
    return function(dispatch) {
      return productsApi
        .getProduct(productId)
        .then(product => {
          dispatch(loadProductSuccess(product));
        })
        .catch(error => {
          throw error;
        });
    };
  }

  export function sortProducts(products,field,asc) {
    products = orderBy(products,"productName");
    return { type: types.SORT_PRODUCTS,products};
  }

  export function saveProduct(product) {
    //eslint-disable-next-line no-unused-vars
    return function(dispatch, getState) {
      return productsApi
        .saveProduct(product)
        .then(savedProduct => {
          product.productId
            ? dispatch(updateProductSuccess(savedProduct))
            : dispatch(createProductSuccess(savedProduct));
        })
        .catch(error => {
          throw error;
        });
    };
  }