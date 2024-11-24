import token from '../../utls/set.axios.headers';
import setToken from '../../utls/set.axios.headers';
import * as actionTypes from '../actions/action.types';

const initialState = {
    profile: {},
    authenticatingUser: false,
    token: null,
    resetPasswordEmail: 'engahmedgomaa97@gmail.com',
}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.START_AUTHENTICATION_USER:
            return {
                ...state,
                authenticatingUser: true
            }
        case actionTypes.END_AUTHENTICATION_USER:
            return {
                ...state,
                authenticatingUser: false
            }
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                profile: action.profile
            }
        case actionTypes.AUTHENTICATE_USER:
            localStorage.setItem('TAKEME_TOKEN', action.token);
            setToken(action.token);

            return {
                ...state,
                token: action.token
            }
        case actionTypes.LOG_PROFILE_OUT:
            localStorage.removeItem('TAKEME_TOKEN');
            return {
                ...state,
                token: null
            }
        case actionTypes.GET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
}