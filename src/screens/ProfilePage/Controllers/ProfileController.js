import { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetProfileData, UpdateGenderAPI, UpdateNameAPI, UpdateBirthDateAPI, UpdateProfileImage, UpdateLocationAPI } from '../models/manageProfile'
import waitForReduxValue from '../../../utilty/useDelayValue'
import { addAlert } from '../../../store/actions/alert.actions';


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
        case "START_FETCH_PROFILE":
            return { ...state, isLoading: true };
        case "END_FETCH_PROFILE":
            return { ...state, isLoading: false };
        case "FETCH_PROFILE":
            return { ...state, ...action.payload };
        
        /// Update Gender
        case "START_UPDATE_GENDER":
            return { ...state, isUpdateGender: true}
        case "END_UPDATE_GENDER":
            return {...state, isUpdateGender: false}
        case "UPDATE_GENDER":
            return { ...state, gender: action.payload };
        
        /// Update Name
        case "START_UPDATE_NAME":
            return { ...state, isUpdateName: true}
        case "END_UPDATE_NAME":
            return {...state, isUpdateName: false}
        case "UPDATE_NAME":
            return {
                ...state,
                translations: {
                    ...state.translations,
                    fields: [{"key": "name", "value": action.payload}, {"key": "display_name", "value": action.payload}]
                },
            };
        
        /// Update DateOFBirth
        case "START_UPDATE_DATE_OF_BIRTH":
            return { ...state, isUpdateDateOfBirth: true}
        case "END_UPDATE_DATE_OF_BIRTH":
            return {...state, isUpdateDateOfBirth: false}
        case "UPDATE_DATE_OF_BIRTH":
            return { ...state, dateOfBirth: action.payload };

        /// Update Profile Image
        case "START_UPDATE_IMAGE":
            return { ...state, isUpdateImage: true}
        case "END_UPDATE_IMAGE":
            return {...state, isUpdateImage: false}
        case "UPDATE_IMAGE":
            return {
                ...state,
                imageAttachment: { ...state.imageAttachment, ...action.payload }
            };


        /// Update Profile Location
        case "START_UPDATE_LOCATION":
            return { ...state, isUpdateImage: true}
        case "END_UPDATE_LOCATION":
            return {...state, isUpdateImage: false}
        case "UPDATE_LOCATION":
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
        console.log(alertMessage)
    }

    // Fetch Profile Data from Redux and wait for it
    const fetchProfileDataFromRedux = async () => {
        dispatch({ type: "START_FETCH_PROFILE" });
        try {
            const profile = await waitForReduxValue(() => authProfile, (value) => value?.id !== undefined, 5000);
            console.log("PROFILE DATA REDUX`", profile)
            dispatch({type: "FETCH_PROFILE", payload: profile})
        } catch (error) {
            console.error("Error waiting for Redux value:", error.message);
            console.log("Start Fetching...")
            const profile = await fetchProfileData()
            dispatch({type: "FETCH_PROFILE", payload: profile})
        } finally {
            dispatch({type: "END_FETCH_PROFILE"})
        }
    };

    // Fetch Profile Data
    const fetchProfileData = async () => {
        dispatch({ type: "START_FETCH_PROFILE" });
        const response = await GetProfileData({ mLocale: "ar_SA", localeId: 1});
        console.log("=====> RESPONSE FETCH PROFILE : ", response)
        if (response?.status) {
            dispatch({ type: "FETCH_PROFILE", payload: response.output });
            dispatchRedux({type: "GET_USER_PROFILE", profile: response.output})
        } else {
            const profile = await fetchProfileDataFromRedux()
            dispatch({type: "FETCH_PROFILE", payload: profile})
        }
        dispatch({ type: "END_FETCH_PROFILE" })
    };

    // Update Gender Function
    const updateGender = async (gender) => {
        dispatch({ type: "START_UPDATE_GENDER"})
        dispatch({ type: "UPDATE_GENDER", payload: gender });
        const response = await UpdateGenderAPI({ mLocale: 'ar_SA', userId: ProfileData.id, gender: gender })
        dispatch({ type: "END_UPDATE_GENDER" })
    }
    
    const updateName = async (name) => {
        dispatch({ type: "START_UPDATE_NAME"})
        dispatch({ type: "UPDATE_NAME", payload: name });
        const response = await UpdateNameAPI({mLocale: 'ar_SA', LocaleId:1, userId: ProfileData.id, name: name, addAlert: handleAlert})
        dispatch({ type: "END_UPDATE_NAME"})
    }
    
    const updateDateOfBirth = async (dateOfBirth) => {
        dispatch({ type: "START_UPDATE_DATE_OF_BIRTH"})
        dispatch({ type: "UPDATE_DATE_OF_BIRTH", payload: dateOfBirth });
        const response = await UpdateBirthDateAPI({ mLocale: "ar_SA", userId: ProfileData.id, BirthOfDate: dateOfBirth})
        dispatch({ type: "END_UPDATE_DATE_OF_BIRTH"})
    }

    // Update Gender Function
    const updateProfileImage = async (props) => {
        dispatch({ type: "START_UPDATE_IMAGE"})
        dispatch({ type: "UPDATE_IMAGE", payload: props });
        await UpdateProfileImage({ mLocale: 'ar_SA', localeId: 4, userId: ProfileData.id, bodyData: props })
        dispatch({ type: "END_UPDATE_IMAGE" })
    }

    const UpdateLocation = async (props) => {
        console.log("PROPS", props)
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

        dispatch({ type: "START_UPDATE_LOCATION"})
        dispatch({ type: "UPDATE_LOCATION", payload: props });
        const response = await UpdateLocationAPI({ mLocale: 'ar_SA', localeId: 4, userId: ProfileData.id, bodyData: data })
        console.log("RESPONSE UPDATE: ", response)
        dispatch({ type: "END_UPDATE_LOCATION" })
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