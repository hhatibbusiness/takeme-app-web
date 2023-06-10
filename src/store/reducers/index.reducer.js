import {combineReducers} from "redux";
import assetsReducer from "./assets.reducer";

const initialState = {
    message: 'Hello from the store'
};

const messageReducer = (state = initialState) => {
    return state;
}

export default combineReducers({
    message: messageReducer,
    assets: assetsReducer
});