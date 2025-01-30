import { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetProfileData, UpdateGenderAPI, UpdateNameAPI, UpdateBirthDateAPI, UpdateProfileImage, UpdateLocationAPI } from '../models/manageProfile'
import waitForReduxValue from '../../../utilty/useDelayValue'
import { addAlert } from '../../../store/actions/alert.actions';


// Constants for action types
const ACTION_TYPES = {
    START_FETCH_PROFILE: 'START_FETCH_PROFILE',
    END_FETCH_PROFILE: 'END_FETCH_PROFILE',
    FETCH_PROFILE: 'FETCH_PROFILE',
    START_UPDATE_GENDER: 'START_UPDATE_GENDER',
    END_UPDATE_GENDER: 'END_UPDATE_GENDER',
    UPDATE_GENDER: 'UPDATE_GENDER',
    START_UPDATE_NAME: 'START_UPDATE_NAME',
    END_UPDATE_NAME: 'END_UPDATE_NAME',
    UPDATE_NAME: 'UPDATE_NAME',
    START_UPDATE_DATE_OF_BIRTH: 'START_UPDATE_DATE_OF_BIRTH',
    END_UPDATE_DATE_OF_BIRTH: 'END_UPDATE_DATE_OF_BIRTH',
    UPDATE_DATE_OF_BIRTH: 'UPDATE_DATE_OF_BIRTH',
    START_UPDATE_IMAGE: 'START_UPDATE_IMAGE',
    END_UPDATE_IMAGE: 'END_UPDATE_IMAGE',
    UPDATE_IMAGE: 'UPDATE_IMAGE',
    START_UPDATE_LOCATION: 'START_UPDATE_LOCATION',
    END_UPDATE_LOCATION: 'END_UPDATE_LOCATION',
    UPDATE_LOCATION: 'UPDATE_LOCATION',
};

const initialState = {
    id: null,
    type: "Person",
    imageAttachment: {
        id: null,
        path: null,
        title: "",
        type: "image",
        comments: "",
    },
    description: null,
    location: {
        id: 0,
        locationName: null,
        address: null,
        postalCode: null,
        latitude: 0,
        longitude: 0,
        buildingNumber: null,
        floorNumber: null,
        roomNumber: null,
        placeId: null,
        comments: null,
        navigationList: [
            {
                id: 0,
                url: null,
                name: null,
                displayName: null,
                icon: null,
                locationId: null,
                comments: null
            }
        ]
    },
    urlPostfix: null,
    comments: null,
    translations: {
      localeId: null,
      fields: [
        { key: "name", value: "" },
        { key: "display_name", value: "" },
      ],
    },
    userId: null,
    dateOfBirth: { day: null, month: null, year: null, display: null },
    gender: null,
    isLoading: true,
    isUpdateGender: false,
    isUpdateName: false,
    isUpdateDateOfBirth: false,
    isUpdateImage: false,
};


function reducer(state, action) {
    switch (action.type) {
        // Fetch Profile Data
        case ACTION_TYPES.START_FETCH_PROFILE:
            return { ...state, isLoading: true };
        case ACTION_TYPES.END_FETCH_PROFILE:
            return { ...state, isLoading: false };
        case ACTION_TYPES.FETCH_PROFILE:
            return { ...state, ...action.payload };
        
        /// Update Gender
        case ACTION_TYPES.START_UPDATE_GENDER:
            return { ...state, isUpdateGender: true}
        case ACTION_TYPES.END_UPDATE_GENDER:
            return {...state, isUpdateGender: false}
        case ACTION_TYPES.UPDATE_GENDER:
            return { ...state, gender: action.payload };
        
        /// Update Name
        case ACTION_TYPES.START_UPDATE_NAME:
            return { ...state, isUpdateName: true}
        case ACTION_TYPES.END_UPDATE_NAME:
            return {...state, isUpdateName: false}
        case ACTION_TYPES.UPDATE_NAME:
            return {
                ...state,
                translations: {
                    ...state.translations,
                    fields: [{"key": "name", "value": action.payload}, {"key": "display_name", "value": action.payload}]
                },
            };
        
        /// Update DateOFBirth
        case ACTION_TYPES.START_UPDATE_DATE_OF_BIRTH:
            return { ...state, isUpdateDateOfBirth: true}
        case ACTION_TYPES.END_UPDATE_DATE_OF_BIRTH:
            return {...state, isUpdateDateOfBirth: false}
        case ACTION_TYPES.UPDATE_DATE_OF_BIRTH:
            return { ...state, dateOfBirth: action.payload };

        /// Update Profile Image
        case ACTION_TYPES.START_UPDATE_IMAGE:
            return { ...state, isUpdateImage: true}
        case ACTION_TYPES.END_UPDATE_IMAGE:
            return {...state, isUpdateImage: false}
        case ACTION_TYPES.UPDATE_IMAGE:
            return {
                ...state,
                imageAttachment: { ...state.imageAttachment, ...action.payload }
            };


        /// Update Profile Location
        case ACTION_TYPES.START_UPDATE_LOCATION:
            return { ...state, isUpdateImage: true}
        case ACTION_TYPES.END_UPDATE_LOCATION:
            return {...state, isUpdateImage: false}
        case ACTION_TYPES.UPDATE_LOCATION:
            return {
                ...state,
                location: { ...state.location, ...action.payload }
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


/// Main Hook that contains the Methods to Update
function useProfileController() {
    const [ProfileData, dispatch] = useReducer(reducer, initialState);
    const authProfile = useSelector((state) => state.auth?.profile);
    const dispatchRedux = useDispatch();

    const handleAlert = (alertMessage) =>{
        dispatchRedux(addAlert(alertMessage))
    }

    // Fetch Profile Data from Redux and wait for it
    const fetchProfileDataFromRedux = async () => {
        dispatch({ type: ACTION_TYPES.START_FETCH_PROFILE });
        try {
            const profile = await waitForReduxValue(() => authProfile, (value) => value?.id !== undefined, 5000);
            dispatch({type: ACTION_TYPES.FETCH_PROFILE, payload: profile})
        } catch (error) {
            const profile = await fetchProfileData()
            dispatch({type: ACTION_TYPES.FETCH_PROFILE, payload: profile})
        } finally {
            dispatch({type: ACTION_TYPES.END_FETCH_PROFILE})
        }
    };

    // Fetch Profile Data
    const fetchProfileData = async () => {
        dispatch({ type: ACTION_TYPES.START_FETCH_PROFILE });
        const response = await GetProfileData({ mLocale: "ar_SA", localeId: 1});

        // CHECK THE RESPONSE TO UPDATE AND GET THE REDUX
        if (response?.status) {
            dispatch({ type: ACTION_TYPES.FETCH_PROFILE, payload: response.output });
            dispatchRedux({type: "GET_USER_PROFILE", profile: response.output})
        } else {
            const profile = await fetchProfileDataFromRedux()
            dispatch({type: ACTION_TYPES.FETCH_PROFILE, payload: profile})
        }
        dispatch({ type: ACTION_TYPES.END_FETCH_PROFILE })
    };

    // Update Gender Function
    const updateGender = async (gender) => {
        dispatch({ type: ACTION_TYPES.START_UPDATE_GENDER})
        dispatch({ type: ACTION_TYPES.UPDATE_GENDER, payload: gender });
        await UpdateGenderAPI({ mLocale: 'ar_SA', userId: ProfileData.id, gender: gender })
        dispatch({ type: ACTION_TYPES.END_UPDATE_GENDER })
    }
    
    // Update Name
    const updateName = async (name) => {
        dispatch({ type: ACTION_TYPES.START_UPDATE_NAME})
        dispatch({ type: ACTION_TYPES.UPDATE_NAME, payload: name });
        await UpdateNameAPI({mLocale: 'ar_SA', LocaleId:1, userId: ProfileData.id, name: name, addAlert: handleAlert})
        dispatch({ type: ACTION_TYPES.END_UPDATE_NAME})
    }
    
    // Update DateOfBirth
    const updateDateOfBirth = async (dateOfBirth) => {
        dispatch({ type: ACTION_TYPES.START_UPDATE_DATE_OF_BIRTH})
        dispatch({ type: ACTION_TYPES.UPDATE_DATE_OF_BIRTH, payload: dateOfBirth });
        await UpdateBirthDateAPI({ mLocale: "ar_SA", userId: ProfileData.id, BirthOfDate: dateOfBirth})
        dispatch({ type: ACTION_TYPES.END_UPDATE_DATE_OF_BIRTH})
    }

    // Update Gender Function
    const updateProfileImage = async (props) => {
        dispatch({ type: ACTION_TYPES.START_UPDATE_IMAGE})
        dispatch({ type: ACTION_TYPES.UPDATE_IMAGE, payload: props });
        await UpdateProfileImage({ mLocale: 'ar_SA', localeId: 4, userId: ProfileData.id, bodyData: props })
        dispatch({ type: ACTION_TYPES.END_UPDATE_IMAGE })
    }

    // Update Location
    const UpdateLocation = async (props) => {
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
        await UpdateLocationAPI({ mLocale: 'ar_SA', localeId: 4, userId: ProfileData.id, bodyData: data })
        dispatch({ type: ACTION_TYPES.END_UPDATE_LOCATION })
    }

    return {
        ProfileData,
        ProfileActions: {
            fetchProfileData,
            fetchProfileDataFromRedux,
            updateGender,
            updateName,
            updateDateOfBirth,
            updateProfileImage,
            UpdateLocation,
        },
    };
}

export default useProfileController;