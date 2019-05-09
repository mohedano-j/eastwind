import * as types from "../actions/actionTypes";

export default function productsReducer(state = new Array<any>(), action: any) {
  switch (action.type) {
    case types.PRODUCT_ADD_SUCCESS:
      return [...state, { ...action.product }];
    case types.PRODUCT_EDIT_SUCCESS:
      return state.map(product =>
        product.productId === action.product.productId
          ? action.product
          : product
      );
    case types.PRODUCT_LIST_LOAD_SUCCESS:
      return action.products;
    case types.PRODUCT_LIST_SORT_SUCCESS:
      return action.products;
    case types.PRODUCT_DELETE_SUCCESS:
      return state.filter(
        product => product.productId !== action.product.productId
      );
    default:
      return state;
  }
}
