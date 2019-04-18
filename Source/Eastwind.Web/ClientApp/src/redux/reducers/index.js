import { combineReducers } from "redux";
import products from "./productReducer";
import categories from "./categoryReducer";

const rootReducer = combineReducers({
    products,
    categories
});

export default rootReducer;
