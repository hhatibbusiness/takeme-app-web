import * as actionTypes from "../actions/action.types";

const initialState = {
    data: {},
    token: null,
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
                localStorage.setItem('takemetoken', token);
                localStorage.setItem('takemeuser', JSON.stringify(action.data.output));
                return {
                    ...state,
                    token: token,
                    data: action.data.output,
                    isAuthenticated: true,
                    error: false,
                    errorMessage: null
                }
            })();
        case actionTypes.LOAD_USER_DATA:
            return {
                ...state,
                data: action.userData,
                isAuthenticated: true,
                token: action.token,
                error: false
            }
        case actionTypes.LOG_USER_OUT:
            return {
                ...state,
                data: {},
                token: null,
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