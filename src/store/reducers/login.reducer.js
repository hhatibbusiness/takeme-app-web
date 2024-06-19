import * as actionTypes from "../actions/action.types";

const initialState = {
    takemeProviderData: {},
    takemeUserData: {},
    takemeUserToken: null,
    takemeProviderToken: null,
    logging: false,
    isAuthenticated: false,
    error: false,
    errorMessage: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_LOGGING_USER_IN:
            return {
                ...state,
                logging: true,
                error: false
            }
        case actionTypes.END_LOGGING_USER_IN:
            return {
                ...state,
                logging: false
            }
        case actionTypes.LOGIN_USER_IN:
            return (() => {
                const equal = action.data.message.indexOf('=') + 1;
                const colne = action.data.message.indexOf(';');
                const token = action.data.message.slice(equal, colne);
                console.log(token);
                localStorage.removeItem('takemeToken');
                localStorage.removeItem('takemeuser');
                localStorage.setItem('takemetoken', token);
                localStorage.setItem('takemeuser', JSON.stringify(action.data.output));
                return {
                    ...state,
                    takemeUserToken: token,
                    takemeUserData: action.data.output,
                    // isAuthenticated: true,
                    error: false,
                    errorMessage: null
                }
            })();
        case actionTypes.LOG_PROVIDER_IN:
            return (() => {
                const equal = action.data.message.indexOf('=') + 1;
                const colne = action.data.message.indexOf(';');
                const token = action.data.message.slice(equal, colne);
                console.log(token);
                localStorage.removeItem('takemeToken');
                localStorage.removeItem('takemeuser');
                localStorage.setItem('takemetoken', token);
                localStorage.setItem('takemeuser', JSON.stringify(action.data.output));
                return {
                    ...state,
                    takemeProviderToken: token,
                    takemeProviderData: action.data.output,
                    isAuthenticated: true,
                    error: false,
                    errorMessage: null
                }
            })();
        case actionTypes.LOAD_USER_DATA:
            console.log(action);
            return {
                ...state,
                takemeUserData: action.takemeUserData,
                isAuthenticated: true,
                takemeUserToken: action.takemeUserToken,
                error: false
            }
        case actionTypes.LOAD_PROVIDER_DATA:
            return {
                ...state,
                takemeProviderData: action.provider,
                takemeProviderToken: action.providerToken
            }
        case actionTypes.LOG_USER_OUT:
            return {
                ...state,
                takemeProviderData: {},
                takemeProviderToken: null,
                isAuthenticated: false,
                error: false
            }
        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.message
            }
        default:
            return state;
    }
}