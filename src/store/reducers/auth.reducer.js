import setToken from '../../utls/set.axios.headers';
import * as actionTypes from '../actions/action.types';
import { jwtDecode } from "jwt-decode";

const initialState = {
    profile: null,
    isAuthenticated: false,
    authenticatingUser: false,
    token: null,
    resetPasswordEmail: 'engahmedgomaa97@gmail.com',
    roles: null
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
        // case actionTypes.AUTHENTICATE_USER:
        //     return {
        //         ...state,
        //         profile: action.profile
        //     }
        case actionTypes.AUTHENTICATE_USER:
            console.log(action.token);
            localStorage.setItem('TAKEME_TOKEN', action.token);
            setToken(action.token);

            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                profile: action.personalProfile
            }
        case actionTypes.LOG_PROFILE_OUT:
            return initialState;
            
        case actionTypes.GET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
                isAuthenticated: true
            }
        case actionTypes.GET_USER_ROLE:
            const tokenDecoded = jwtDecode(action.token);

            console.log(tokenDecoded);
            
            return {
                ...state,
                roles: tokenDecoded.roles,
                isAuthenticated: true
            }
        default:
            return state;
    }
}