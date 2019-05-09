import { combineReducers } from "redux";
import productsReducer from "./productReducer";
import categoriesReducer from "./categoryReducer";
import apiStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  apiStatus: apiStatusReducer
});

export default rootReducer;
