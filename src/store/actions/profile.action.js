import * as ACTION_TYPES from './action.types';
import { GetProfileData, UpdateGenderAPI, UpdateNameAPI, UpdateBirthDateAPI, UpdateProfileImage, UpdateLocationAPI } from '../../screens/ProfilePage/models/manageProfile'
import FetchAPI from '../../utilty/FetchAPI';
import { BaseURL, AUTH_TOKEN } from '../../assets/constants/Base';



// Fetch Profile Data
export const fetchProfileData = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.START_FETCH_PROFILE });
    const response = await GetProfileData({ mLocale: "ar_SA", localeId: 1});

    // CHECK THE RESPONSE TO UPDATE AND GET THE REDUX
    if (response?.status) {
        dispatch({ type: ACTION_TYPES.FETCH_PROFILE, payload: response.output });
    }
    dispatch({ type: ACTION_TYPES.END_FETCH_PROFILE })
};

// Update Gender Function
export const updateGender = (id, gender) => async dispatch => {
    dispatch({ type: ACTION_TYPES.START_UPDATE_GENDER})
    dispatch({ type: ACTION_TYPES.UPDATE_GENDER, payload: gender });
    await UpdateGenderAPI({ mLocale: 'ar_SA', userId: id, gender: gender })
    dispatch({ type: ACTION_TYPES.END_UPDATE_GENDER })
}

// Update Name
export const updateName = (id, name) => async dispatch => {
    dispatch({ type: ACTION_TYPES.START_UPDATE_NAME})
    dispatch({ type: ACTION_TYPES.UPDATE_NAME, payload: name });
    await UpdateNameAPI({mLocale: 'ar_SA', LocaleId: 1, userId: id, name: name, addAlert: ()=>{} })
    dispatch({ type: ACTION_TYPES.END_UPDATE_NAME})
}

// Update DateOfBirth
export const updateDateOfBirth = (id, dateOfBirth) => async dispatch => {
    dispatch({ type: ACTION_TYPES.START_UPDATE_DATE_OF_BIRTH})
    dispatch({ type: ACTION_TYPES.UPDATE_DATE_OF_BIRTH, payload: dateOfBirth });
    await UpdateBirthDateAPI({ mLocale: "ar_SA", userId: id, BirthOfDate: dateOfBirth})
    dispatch({ type: ACTION_TYPES.END_UPDATE_DATE_OF_BIRTH})
}

// Update Gender Function
export const updateProfileImage = (id, props) => async dispatch => {
    dispatch({ type: ACTION_TYPES.START_UPDATE_IMAGE})
    dispatch({ type: ACTION_TYPES.UPDATE_IMAGE, payload: props });
    await UpdateProfileImage({ mLocale: 'ar_SA', localeId: 1, userId: id, bodyData: props })
    dispatch({ type: ACTION_TYPES.END_UPDATE_IMAGE })
}

// Update Location
export const UpdateLocation = (id, props) => async dispatch => {
    const data = {
        ...props,
        placeId: props?.placesResponseDto?.id,
        id: 0,
        navigationList: [
            {
                id : null
            }
        ]
    }

    dispatch({ type: ACTION_TYPES.START_UPDATE_LOCATION})
    dispatch({ type: ACTION_TYPES.UPDATE_LOCATION, payload: props });
    await UpdateLocationAPI({ mLocale: 'ar_SA', localeId: 1, userId: id, bodyData: data })
    dispatch({ type: ACTION_TYPES.END_UPDATE_LOCATION })
}


export const DeleteProfileData = (userId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.START_DELETE_PROFILE });
    
    const response = await FetchAPI(
        `${BaseURL}/users/delete?mLocale=ar_SA&userId=${userId}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': AUTH_TOKEN
            }
        },
        dispatch
    );

    if (response?.status) {
        dispatch({ type: ACTION_TYPES.LOG_USER_OUT });
    }
    
    dispatch({ type: ACTION_TYPES.END_DELETE_PROFILE });
    return response;
}
