import { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetProfileData, UpdateGenderAPI, UpdateNameAPI, UpdateBirthDateAPI } from '../models/manageProfile'
import waitForReduxValue from '../../../utilty/useDelayValue'
import { addAlert } from '../../../store/actions/alert.actions';


const initialState = {
    id: null,
    type: "Person",
    imageAttachment: {
      id: null,
      path: "/images/example.png",
      title: "Example Title",
      type: "image/png",
      comments: "This is a dummy comment.",
      createdDate: "2024-11-29T12:34:56",
      updatedDate: "2024-11-29T14:00:00",
    },
    description: null,
    location: null,
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

    return {
        ProfileData,
        ProfileActions: {
        fetchProfileData,
        fetchProfileDataFromRedux,
        updateGender,
        updateName,
        updateDateOfBirth,
      },
    };
}

export default useProfileController;