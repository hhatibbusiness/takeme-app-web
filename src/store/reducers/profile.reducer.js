import * as ACTION_TYPES from '../actions/action.types';

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
    authentications: [],
    description: null,
    location: {
        id: 0,
        locationName: '',
        address: '',
        postalCode: null,
        latitude: 0,
        longitude: 0,
        buildingNumber: null,
        floorNumber: null,
        roomNumber: null,
        placeId: null,
        comments: '',
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
    isDeleting: false,
    visitedProfile: null,
    isLoadingVisited: true
};

export default (state = initialState, action) => {
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
            if(action.visited) {
                return {
                    ...state,
                    visitedProfile: {
                        ...state.visitedProfile,
                        gender: action.payload
                    }
                }
            }
            return { ...state, gender: action.payload };
        
        /// Update Name
        case ACTION_TYPES.START_UPDATE_NAME:
            return { ...state, isUpdateName: true}
        case ACTION_TYPES.END_UPDATE_NAME:
            return {...state, isUpdateName: false}
        case ACTION_TYPES.UPDATE_NAME:
            if(action.visited) {
                return {
                    ...state,
                    visitedProfile: {
                        ...state.visitedProfile,
                        translations: {
                            ...state.translations,
                            fields: [{"key": "name", "value": action.payload}, {"key": "display_name", "value": action.payload}]
                        },
                    }
                };
            }
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
            if(action.visited) {
                return {
                    ...state,
                    visitedProfile: {
                        ...state.visitedProfile,
                        dateOfBirth: action.payload
                    }
                }
            }
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
        // Delete Profile
        case ACTION_TYPES.START_DELETE_PROFILE:
            return { ...state, isDeleting: true };
        case ACTION_TYPES.END_DELETE_PROFILE:
            return { ...state, isDeleting: false };
            
        case ACTION_TYPES.LOG_PROFILE_OUT:
            return initialState;
        case ACTION_TYPES.START_FETCHING_VISITED_PROFILE:
            return {
                ...state,
                isLoadingVisited: true
            }
        case ACTION_TYPES.END_FETCHING_VISITED_PROFILE:
            return {
                ...state,
                isLoadingVisited: false
            }
        case ACTION_TYPES.FETCH_VISITED_PROFILE:
            return {
                ...state,
                visitedProfile: action.profile
            }
        default:
            return state;
    }
}
