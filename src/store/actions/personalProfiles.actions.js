import {
    END_FETCHING_PERSONAL_PROFILES,
    FETCH_PERSONAL_PROFILES,
    START_FETCHING_PERSONAL_PROFILES
} from "./action.types";
import {BASE_URL} from "../../utls/assets";
import FetchAPI from "../../utilty/FetchAPI";

export const fetchPersonalProfiles = data => async dispatch => {
    dispatch({type: START_FETCHING_PERSONAL_PROFILES});
    const url = `${BASE_URL}endpoints/users/preview/list?mLocale=${data.locale}&localeId=${data.localeId}&sortType=${data.sortType}&page=${data.page}`;
    const options = {
        method: 'GET',
    }

    const profiles = [
        {
            "id":1,//the user id
            "name":"Ahmed Gomaa",//from the translations of base profile
            "displayName":"احمد جمعه",//from the translations of base profile
            "verifiedStatus":1,
            "profileStatus": 1,
            "adminModeEnabled":false,
            "roles":[1,2],
            "authentications":[
                {//this is body of UserAuthenticationResponseDto
                    "id":1,
                    "authType": "facebook",
                    "authValue": "x@gmail.com",
                    "loginRetries": 0,
                    "isLocked":false,
                    "lockoutUntil": "..."
                }
            ]
        },
        {
            "id":1,//the user id
            "name":"Ahmed Gomaa",//from the translations of base profile
            "displayName":"احمد جمعه",//from the translations of base profile
            "verifiedStatus":1,
            "profileStatus": 1,
            "adminModeEnabled":false,
            "roles":[1,2],
            "authentications":[
                {//this is body of UserAuthenticationResponseDto
                    "id":1,
                    "authType": "facebook",
                    "authValue": "x@gmail.com",
                    "loginRetries": 0,
                    "isLocked":false,
                    "lockoutUntil": "..."
                }
            ]
        },
        {
            "id":1,//the user id
            "name":"Ahmed Gomaa",//from the translations of base profile
            "displayName":"احمد جمعه",//from the translations of base profile
            "verifiedStatus":1,
            "profileStatus": 1,
            "adminModeEnabled":false,
            "roles":[1,2],
            "authentications":[
                {//this is body of UserAuthenticationResponseDto
                    "id":1,
                    "authType": "facebook",
                    "authValue": "x@gmail.com",
                    "loginRetries": 0,
                    "isLocked":false,
                    "lockoutUntil": "..."
                }
            ]
        },
        {
            "id":1,//the user id
            "name":"Ahmed Gomaa",//from the translations of base profile
            "displayName":"احمد جمعه",//from the translations of base profile
            "verifiedStatus":1,
            "profileStatus": 1,
            "adminModeEnabled":false,
            "roles":[1,2],
            "authentications":[
                {//this is body of UserAuthenticationResponseDto
                    "id":1,
                    "authType": "facebook",
                    "authValue": "x@gmail.com",
                    "loginRetries": 0,
                    "isLocked":false,
                    "lockoutUntil": "..."
                }
            ]
        },

    ]

    const res = await FetchAPI(url, options, dispatch);

    dispatch({
        type: FETCH_PERSONAL_PROFILES,
        profiles
    });

    // if(res.status == true) {
    //     dispatch({
    //         type: FETCH_PERSONAL_PROFILES,
    //         profiles: res.output
    //     });
    //     return res;
    // }

    dispatch({type: END_FETCHING_PERSONAL_PROFILES});
}