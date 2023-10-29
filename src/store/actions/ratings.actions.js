import {
    ADD_PROVIDER_RATING,
    END_ADDING_PROVIDER_RATING,
    END_FETCHING_PROVIDER_RATINGS,
    FETCH_PROVIDER_RATINGS,
    START_ADDING_PROVIDER_RATING,
    START_FETCHING_PROVIDER_RATINGS
} from "./action.types";
import axios from "axios";
import {BASE_URL} from "../../utls/assets";

// export const fetchProviderRatigs = data => async dispatch => {
//     const now = new Date();
//
//     const res = JSON.parse(
//         JSON.stringify(
//                 {
//                     "status": true,
//                     "message": "تم الحصول على تقييمات بنجاح",
//                     "output": [
//                         {
//                             "id": 14,
//                             "phoneCountryCode": "972",
//                             "phone": "0506331003",
//                             "email": "amenkh12222@gmail.com",
//                             "password": "$2a$10$wUTAj2cHopfzROvmGzeF0uep4mB5ntA8c9Mq8oQsWhcF5ScZXXZ2y",
//                             "uType": "customer",
//                             "clientId": null,
//                             "roles": null,
//                             "roleList": [],
//                             "loginAttempts": 0,
//                             "updatedDate": "2023-09-05T17:53:32.000+00:00",
//                             "createdDate": "2023-09-05T17:53:32.000+00:00",
//                             "name": "MyCustomer",
//                             "country": "israel",
//                             "city": "Ghajar",
//                             "activeStatus": "active",
//                             "statusDetails": "عملية مكتملة",
//                             "comments": "هذا هو الكومنت التفصيلي للتقييم يمن ان يضيف فيه المستخدم كل التفاصيل التي يحبها",
//                             "sortIndex": 1,
//                             "termsConditionsAccepted": 0,
//                             "ratingId": 1,
//                             "customerId": 1,
//                             "providerId": 13,
//                             "ratingScore": 2,
//                             "ratingComment": "rating comment",
//                             "locked": false,
//                             "ratingDate": now
//                         },
//                         {
//                             "id": 14,
//                             "phoneCountryCode": "972",
//                             "phone": "0506331003",
//                             "email": "amenkh12222@gmail.com",
//                             "password": "$2a$10$wUTAj2cHopfzROvmGzeF0uep4mB5ntA8c9Mq8oQsWhcF5ScZXXZ2y",
//                             "uType": "customer",
//                             "clientId": null,
//                             "roles": null,
//                             "roleList": [],
//                             "loginAttempts": 0,
//                             "updatedDate": "2023-09-05T17:53:32.000+00:00",
//                             "createdDate": "2023-09-05T17:53:32.000+00:00",
//                             "name": "MyCustomer",
//                             "country": "israel",
//                             "city": "Ghajar",
//                             "activeStatus": "active",
//                             "statusDetails": "عملية مكتملة",
//                             "comments": "هذا هو الكومنت التفصيلي للتقييم يمن ان يضيف فيه المستخدم كل التفاصيل التي يحبها",
//                             "sortIndex": 1,
//                             "termsConditionsAccepted": 0,
//                             "ratingId": 1,
//                             "customerId": 1,
//                             "providerId": 13,
//                             "ratingScore": 2,
//                             "ratingComment": "rating comment",
//                             "locked": false,
//                             "ratingDate": now
//                         },
//                         {
//                             "id": 14,
//                             "phoneCountryCode": "972",
//                             "phone": "0506331003",
//                             "email": "amenkh12222@gmail.com",
//                             "password": "$2a$10$wUTAj2cHopfzROvmGzeF0uep4mB5ntA8c9Mq8oQsWhcF5ScZXXZ2y",
//                             "uType": "customer",
//                             "clientId": null,
//                             "roles": null,
//                             "roleList": [],
//                             "loginAttempts": 0,
//                             "updatedDate": "2023-09-05T17:53:32.000+00:00",
//                             "createdDate": "2023-09-05T17:53:32.000+00:00",
//                             "name": "MyCustomer",
//                             "country": "israel",
//                             "city": "Ghajar",
//                             "activeStatus": "active",
//                             "statusDetails": "عملية مكتملة",
//                             "comments": "هذا هو الكومنت التفصيلي للتقييم يمن ان يضيف فيه المستخدم كل التفاصيل التي يحبها",
//                             "sortIndex": 1,
//                             "termsConditionsAccepted": 0,
//                             "ratingId": 1,
//                             "customerId": 1,
//                             "providerId": 13,
//                             "ratingScore": 2,
//                             "ratingComment": "rating comment",
//                             "locked": false,
//                             "ratingDate": now
//                         }
//                     ]
//                 }
//         )
//     )
//     dispatch({
//         type: FETCH_PROVIDER_RATINGS,
//         ratings: res.output
//     });
//     dispatch(endFetchingProviderRatings);
// }

export const fetchProviderRatigs = data => async dispatch => {
    try {
        dispatch(startFetchingProviderRatings);
        console.log(data);
        const res = await axios.get(`${BASE_URL}endpoints/rating/providers/list-provider-ratings?locale=${data.lan}&providerId=${data.providerId}`);
        console.log(res);
        if(res.status == 200 && res.data.status == true) {
            dispatch({
                type: FETCH_PROVIDER_RATINGS,
                ratings: res?.data?.output
            });
        }
        dispatch(endFetchingProviderRatings);
    } catch (e) {
        console.log(e?.message);
        dispatch(endFetchingProviderRatings);
    }
}

const startFetchingProviderRatings = {
    type: START_FETCHING_PROVIDER_RATINGS
}

const endFetchingProviderRatings = {
    type: END_FETCHING_PROVIDER_RATINGS
}

const startAddingProviderRating = {
    type: START_ADDING_PROVIDER_RATING
}

const endAddingProviderRating = {
    type: END_ADDING_PROVIDER_RATING
}

export const addProviderRating = data => async dispatch => {
    try {
        dispatch(startAddingProviderRating);
        const res = await axios.post(`${BASE_URL}endpoints/rating/providers/add`, data);
        if(res.status == 200 && res.data.status == true) {
            console.log(res);
            dispatch({
                type: ADD_PROVIDER_RATING,
                rating: res?.data?.output
            });
        }
        dispatch(endAddingProviderRating);
        return res;
    } catch (e) {
        console.error(e?.message);
        dispatch(endAddingProviderRating)
    }
}