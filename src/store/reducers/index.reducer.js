import {combineReducers} from "redux";
import assetsReducer from "./assets.reducer";
import categoriesReducer from "./categories.reducer";
import productReducer from "./product.reducer";
import providerReducer from "./Provider.reducer";
import searchReducer from "./search.reducer";

const initialState = {
    message: 'Hello from the store'
};

const messageReducer = (state = initialState) => {
    return state;
}

export default combineReducers({
    message: messageReducer,
    assets: assetsReducer,
    categories: categoriesReducer,
    product: productReducer,
    provider: providerReducer,
    search: searchReducer
});