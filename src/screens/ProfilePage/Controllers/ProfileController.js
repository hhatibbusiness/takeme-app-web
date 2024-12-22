import { useReducer } from 'react';
import { GetProfileData, UpdateGenderAPI, UpdateNameAPI, UpdateBirthDateAPI } from '../models/manageProfile'

const initialState = {
    id: 1,
    type: "Person",
    imageAttachment: {
      id: 1,
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
        { key: "name", value: "مينا سمير لبيب" },
        { key: "display_name", value: "مينا سمير لبيب" },
      ],
    },
    userId: 1,
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
                    fields: state.translations.fields.map((field) =>
                    ["name", "display_name"].includes(field.key)
                        ? { ...field, value: action.payload }
                        : field
                    ),
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
export default function useProfileController() {
    const [ProfileData, dispatch] = useReducer(reducer, initialState);

    // Fetch Profile Data
    const fetchProfileData = async () => {
        dispatch({ type: "START_FETCH_PROFILE" });
        const response = await GetProfileData({ mLocale: "ar_SA", localeId: 1});
        if (response?.status) {
            dispatch({ type: "FETCH_PROFILE", payload: response.output });
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
        const response = await UpdateNameAPI({mLocale: 'ar_SA', LocaleId:1, userId: ProfileData.id, name: name})
        if (response?.status == 200)
            dispatch({ type: "UPDATE_NAME", payload: name });
        dispatch({ type: "END_UPDATE_NAME"})
    }
    
    const updateDateOfBirth = async (dateOfBirth) => {
        dispatch({ type: "START_UPDATE_DATE_OF_BIRTH"})
        const response = await UpdateBirthDateAPI({ mLocale: "ar_SA", userId: ProfileData.id, BirthOfDate: dateOfBirth})
        if (response?.status == 200)
            dispatch({ type: "UPDATE_DATE_OF_BIRTH", payload: dateOfBirth });
        dispatch({ type: "END_UPDATE_DATE_OF_BIRTH"})
    }

    return {
        ProfileData,
        ProfileActions: {
        fetchProfileData,
        updateGender,
        updateName,
        updateDateOfBirth,
      },
    };
  }
  
