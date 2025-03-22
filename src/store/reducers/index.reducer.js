import {combineReducers} from "redux";
import assetsReducer from "./assets.reducer";
import categoriesReducer from "./categories.reducer";
import productReducer from "./product.reducer";
import providerReducer from "./Provider.reducer";
import searchReducer from "./search.reducer";
import aboutReducer from "./about.reducer";
import contractReducer from "./contract.reducer";
import loginReducer from "./login.reducer";
import forgetPasswordReducer from "./forget.password.reducer";
import registerReducer from "./register.reducer";
import uiReducer from "./ui.reducer";
import ratingsReducer from "./ratings.reducer";
import alertReducer from "./alert.reducer";
import authReducer from "./auth.reducer";
import languagesReducer from "./languages.reducer";
import countriesReducer from "./countries.reducer";
import placesReducer from "./places.reducer";
import localeReducer from "./locales.reducers";
import profileReducer from './profile.reducer'
import navbarReducer from "./navbar.reducer";
import rolesReducer from "./roles.reducer";
import subscriptionPlansReducer from "./subscriptionPlans.reducer";
import businessReducer from "./business.reducer";


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
    search: searchReducer,
    about: aboutReducer,
    contract: contractReducer,
    login: loginReducer,
    forget: forgetPasswordReducer,
    register: registerReducer,
    ui: uiReducer,
    ratings: ratingsReducer,
    alert: alertReducer,
    auth: authReducer,
    languages: languagesReducer,
    countries: countriesReducer,
    places: placesReducer,
    locales: localeReducer,
    profile: profileReducer,
    navbar: navbarReducer,
    roles: rolesReducer,
    subscriptionPlans: subscriptionPlansReducer,
    business: businessReducer
});
