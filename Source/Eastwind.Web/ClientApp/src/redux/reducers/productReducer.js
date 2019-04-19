import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.CREATE_PRODUCT_SUCCESS:
     //This is a good example of immutability. We cannot do state state.products.push(action.product )
     //Instead we use the spread operator {...action.product}
      return [...state, { ...action.product }];
    case types.UPDATE_PRODUCT_SUCCESS:
      //We need to return the whole object as state must stay inmutable
      return state.map(product =>
        product.productId === action.product.productId ? action.product : product
      );
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    case types.SORT_PRODUCTS:
      return action.products;
    case types.DELETE_PRODUCT_OPTIMISTIC:
     
      return state.filter(product => product.productId !== action.product.productId);
    default:
      return state;
  }
} 
