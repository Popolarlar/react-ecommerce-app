import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import productReducer from "./Product/product.reducer";

export default combineReducers({ user: userReducer, product: productReducer });
