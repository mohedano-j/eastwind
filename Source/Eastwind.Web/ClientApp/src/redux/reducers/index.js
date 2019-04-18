import { combineReducers } from "redux";
import products from "./productReducer";
import categories from "./categoryReducer";
import apiCallInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
    products,
    categories,
    apiCallInProgress
});

export default rootReducer;
