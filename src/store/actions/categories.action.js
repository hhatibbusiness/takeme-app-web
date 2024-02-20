import axios from "axios";
import {
    CHANGE_CURRENT_ID, CHANGE_FILTER, CHANGE_LAN_SUCCESS, CHANGE_SLIDER_VALUE,
    END_FETCHING_CATEGORIES, END_FETCHING_PRODUCTS, END_LOADING_MORE_PRODUCT_TYPES, ERROR_ACTIVE, ERROR_INACTIVE, FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_PRODUCTS, INCREASE_PAGE_NUMBER, RESET_PAGE_NUMBER,
    START_FETCHING_CATEGORIES,
    START_FETCHING_PRODUCTS,
    START_LOADING_MORE_PRODUCT_TYPES
} from "./action.types";
import {changeSearchCategoryId} from "./search.actions";
import {BASE_URL} from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";
import {getAnalytics, logEvent} from "firebase/analytics";
import removeAxiosHeaders from "../../utls/remove.axios.headers";
import allCategoryImage from "../../assets/images/all-icon.jpg";

// 'https://takeme-all.com/app/endpoints/categories/list?locale=ar';
// https://takeme-all.com/app/endpoints/products-types?locale=ar&categoryId=${id}&page=0

export const startFetchingCategories = {
    type: START_FETCHING_CATEGORIES
}

export const endFetchingCategories = {
    type: END_FETCHING_CATEGORIES
}

export const errorActive = {
    type: ERROR_ACTIVE
}

export const errorInactive = {
    type: ERROR_INACTIVE
}

// change current selected category id action.
export const changeId = id => ({
    type: CHANGE_CURRENT_ID,
    id
});


// fetch the categories list
// export const fetchCategories = (lan, filter, navigate) => async dispatch => {
//     const res = JSON.parse(
//         JSON.stringify(
//             {
//                 "status": true,
//                 "message": "تم الحصول على الفئات بنجاح",
//                 "output": [
//                     {
//                         "id": 1,
//                         "name": "الكل",
//                         "description": null,
//                         "imagePath": "http://194.31.150.116:8080/app/resources/images/categories/all.jpg",
//                         "sortIndex": 1,
//                         "createdDate": "2023-08-05T18:06:11.000+00:00",
//                         "updatedDate": "2023-08-05T18:06:11.000+00:00",
//                         "imageName": "all.jpg"
//                     },
//                     {
//                         "id": 2,
//                         "name": "سياح",
//                         "description": null,
//                         "imagePath": "http://194.31.150.116:8080/app/resources/images/categories/tourists.jpg",
//                         "sortIndex": 2,
//                         "createdDate": "2023-08-05T18:06:11.000+00:00",
//                         "updatedDate": "2023-08-05T18:06:11.000+00:00",
//                         "imageName": "tourists.jpg"
//                     },
//                     {
//                         "id": 3,
//                         "name": "تخييم",
//                         "description": "شرح عن التخييم",
//                         "imagePath": "http://194.31.150.116:8080/app/resources/images/categories/camping.jpg",
//                         "sortIndex": 3,
//                         "createdDate": "2023-08-05T18:06:11.000+00:00",
//                         "updatedDate": "2023-08-05T18:06:11.000+00:00",
//                         "imageName": "camping.jpg"
//                     },
//                     {
//                         "id": 4,
//                         "name": "بناء",
//                         "description": null,
//                         "imagePath": "http://194.31.150.116:8080/app/resources/images/categories/build-and-renovations.jpg",
//                         "sortIndex": 4,
//                         "createdDate": "2023-08-05T18:06:11.000+00:00",
//                         "updatedDate": "2023-08-05T18:06:11.000+00:00",
//                         "imageName": "build-and-renovations.jpg"
//                     },
//                     {
//                         "id": 5,
//                         "name": "ادوات",
//                         "description": "ادوات مميزة",
//                         "imagePath": "http://194.31.150.116:8080/app/resources/images/categories/others.jpg",
//                         "sortIndex": 5,
//                         "createdDate": "2023-08-05T18:06:11.000+00:00",
//                         "updatedDate": "2023-08-05T18:06:11.000+00:00",
//                         "imageName": "others.jpg"
//                     },
//                     {
//                         "id": 21,
//                         "name": "test page 1",
//                         "description": "desc of test",
//                         "imagePath": "https://takeme-all.com/app/resources/images/categories/tourists.jpg",
//                         "sortIndex": 6,
//                         "createdDate": "2023-10-10T18:45:00.000+00:00",
//                         "updatedDate": "2023-10-10T18:45:00.000+00:00",
//                         "imageName": "tourists.jpg"
//                     },
//                     {
//                         "id": 22,
//                         "name": "test page 2",
//                         "description": "desc of test",
//                         "imagePath": "https://takeme-all.com/app/resources/images/categories/tourists.jpg",
//                         "sortIndex": 7,
//                         "createdDate": "2023-10-10T18:45:07.000+00:00",
//                         "updatedDate": "2023-10-10T18:45:07.000+00:00",
//                         "imageName": "tourists.jpg"
//                     },
//                     {
//                         "id": 23,
//                         "name": "test page 3",
//                         "description": "desc of test",
//                         "imagePath": "https://takeme-all.com/app/resources/images/categories/tourists.jpg",
//                         "sortIndex": 8,
//                         "createdDate": "2023-10-10T18:45:12.000+00:00",
//                         "updatedDate": "2023-10-10T18:45:12.000+00:00",
//                         "imageName": "tourists.jpg"
//                     },
//                     {
//                         "id": 24,
//                         "name": "test page 4",
//                         "description": "desc of test",
//                         "imagePath": "https://takeme-all.com/app/resources/images/categories/tourists.jpg",
//                         "sortIndex": 9,
//                         "createdDate": "2023-10-10T18:45:19.000+00:00",
//                         "updatedDate": "2023-10-10T18:45:19.000+00:00",
//                         "imageName": "tourists.jpg"
//                     },
//                     {
//                         "id": 25,
//                         "name": "test page 5",
//                         "description": "desc of test",
//                         "imagePath": "https://takeme-all.com/app/resources/images/categories/tourists.jpg",
//                         "sortIndex": 10,
//                         "createdDate": "2023-10-10T18:45:23.000+00:00",
//                         "updatedDate": "2023-10-10T18:45:23.000+00:00",
//                         "imageName": "tourists.jpg"
//                     }
//                 ]
//             }
//         )
//     )
//     dispatch({
//         type: FETCH_CATEGORIES_SUCCESS,
//         categories: res.output
//     });
//             const firstId = res.output[0].id;
//
//     dispatch(fetchCategoryProducts(firstId, lan, 0, filter, navigate));
//     dispatch(endFetchingCategories)
// }
// // fetch the categories list
export const fetchCategories = (lan, filter, navigate) => async dispatch => {
    try {
        dispatch(startFetchingCategories);
        ///endpoints/categories/list-no-empty?locale=ar&page=0&itemsCount=0
        const res = await axios.get(`${BASE_URL}endpoints/categories/list-no-empty?locale=${lan}`);
        const allCategory =       {
            id: 0,
            name: 'الكل',
            description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
            imagePath: allCategoryImage,
            sortIndex: 1,
            createdDate: new Date(),
            updatedDate: new Date(),
            imageName: 'all.jpg'
        }

        const categories = [
            allCategory,
            ...res.data.output
        ]

        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories
        });
        dispatch(endFetchingCategories);
        if(categories?.length === 0) return;
        const firstId = categories[0].id;
        // console.log(firstId);
        dispatch(errorInactive);
        await dispatch(changeId(firstId));
        await dispatch(fetchCategoryProducts(firstId, lan, 0, filter, navigate));
        return res;
    }catch (err) {
        console.error(err.message);
        if(err?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login');
            localStorage.removeItem('takemetoken');
            localStorage.removeItem('takemeuser');
            removeAxiosHeaders();
            navigate(0);
        }
        const allCategory =       {
            id: 0,
            name: 'الكل',
            description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
            imagePath: allCategoryImage,
            sortIndex: 1,
            createdDate: new Date(),
            updatedDate: new Date(),
            imageName: 'all.jpg'
        }

        const categories = [
            allCategory,
        ]

        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: categories
        });

        const firstId = categories[0].id;


        await dispatch(changeId(firstId));
        await dispatch(fetchCategoryProducts(firstId, lan, 0, filter, navigate));



        dispatch(endFetchingCategories);
        // dispatch(errorActive);
    }
}

// ACTION TO KEEP THE UI FROM CRASHING
const startFetchingProducts = {
    type: START_FETCHING_PRODUCTS
};

const endFetchingProducts = {
    type: END_FETCHING_PRODUCTS
}

//fetch the category products list
// export const fetchCategoryProducts = (id, lan, page, filter, navigate) => async dispatch => {
//     const res = JSON.parse(
//         JSON.stringify(
//     {
//         "status": true,
//         "message": "تم الحصول على نوع المنتجات بنجاح",
//         "output": [
//         {
//             "id": 1,
//             "name": "جولات شرح",
//             "description": null,
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/hdrkhot.png",
//             "sortIndex": 1,
//             "createdDate": "2023-08-05T18:06:11.000+00:00",
//             "updatedDate": "2023-08-05T18:06:11.000+00:00"
//         },
//         {
//             "id": 13,
//             "name": "Page test 11",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 2,
//             "createdDate": "2023-10-10T19:08:19.000+00:00",
//             "updatedDate": "2023-10-10T19:08:19.000+00:00"
//         },
//         {
//             "id": 12,
//             "name": "Page test 10",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 3,
//             "createdDate": "2023-10-10T19:08:13.000+00:00",
//             "updatedDate": "2023-10-10T19:08:13.000+00:00"
//         },
//         {
//             "id": 11,
//             "name": "Page test 9",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 4,
//             "createdDate": "2023-10-10T19:08:09.000+00:00",
//             "updatedDate": "2023-10-10T19:08:09.000+00:00"
//         },
//         {
//             "id": 10,
//             "name": "Page test 8",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 5,
//             "createdDate": "2023-10-10T19:08:04.000+00:00",
//             "updatedDate": "2023-10-10T19:08:04.000+00:00"
//         },
//         {
//             "id": 9,
//             "name": "Page test 7",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 6,
//             "createdDate": "2023-10-10T19:07:59.000+00:00",
//             "updatedDate": "2023-10-10T19:07:59.000+00:00"
//         },
//         {
//             "id": 8,
//             "name": "Page test 6",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 7,
//             "createdDate": "2023-10-10T19:07:54.000+00:00",
//             "updatedDate": "2023-10-10T19:07:54.000+00:00"
//         },
//         {
//             "id": 7,
//             "name": "Page test 5",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 8,
//             "createdDate": "2023-10-10T19:07:49.000+00:00",
//             "updatedDate": "2023-10-10T19:07:49.000+00:00"
//         },
//         {
//             "id": 6,
//             "name": "Page test 4",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 9,
//             "createdDate": "2023-10-10T19:07:36.000+00:00",
//             "updatedDate": "2023-10-10T19:07:36.000+00:00"
//         },
//         {
//             "id": 5,
//             "name": "Page test 3",
//             "description": "test desc",
//             "imagePath": "http://194.31.150.116:8080/app/resources/images/products-types/t3emot.png",
//             "sortIndex": 10,
//             "createdDate": "2023-10-10T19:07:31.000+00:00",
//             "updatedDate": "2023-10-10T19:07:31.000+00:00"
//         }
//     ]
//     }
//         )
//     );
//     dispatch(endFetchingProducts);
//     dispatch({
//         type: FETCH_CATEGORY_PRODUCTS,
//         products: res.output
//     });
// }
export const fetchCategoryProducts = (id, lan, page, filter, navigate) => async dispatch => {
    try {
        // console.log(filter);
        if(page == 0) dispatch(startFetchingProducts);
        const res = await axios.get(`${BASE_URL}endpoints/products-types?locale=${lan}&categoryId=${id}&page=${page}&filterByAction=${filter}`)
        dispatch({
            type: FETCH_CATEGORY_PRODUCTS,
            products: res.data
        });
        dispatch(increasePageNumber());
        const analytics = getAnalytics();
        if(page > 0 && res.status == 200 && res?.data?.length > 0) {
            logEvent(analytics, 'pagination', {
                paginationName: 'procutType'
            })
        }
        dispatch(errorInactive)
        if(page == 0) dispatch(endFetchingProducts);
        return res;
    } catch (e) {
        console.error(e?.response?.status);
        if(e?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login');
        }
        dispatch(endFetchingProducts);

        dispatch(errorActive)
    }
}

export const changeSliderValue = value => ({
    type: CHANGE_SLIDER_VALUE,
    value
});

export const changeLan = (lan, id) => async dispatch => {
    try {
        dispatch({
            type: CHANGE_LAN_SUCCESS,
            lan
        });
        await dispatch(fetchCategories(lan));
        await dispatch(fetchCategoryProducts(id, lan, 0));
        dispatch(errorInactive)
    } catch (e) {
        console.error(e);
        dispatch(errorActive);
    }
};

//increase the page number action
export const increasePageNumber = () => ({
    type: INCREASE_PAGE_NUMBER
});

//reset the page number action
export const resetPageNumber = () => ({
    type: RESET_PAGE_NUMBER
});

export const changeFilter = (id, lan, page, navigate, filter) => async dispatch => {
    try {
        dispatch({
            type: CHANGE_FILTER,
            filter: filter
        });
        dispatch(resetPageNumber());
        const res = await dispatch(fetchCategoryProducts(id, lan, page, filter, navigate));
        return res;
    } catch (e) {
        console.log(e.message);
    }

};

export const startLoadingMoreProductTypes = {
    type: START_LOADING_MORE_PRODUCT_TYPES
}

export const endLoadingProductTypes = {
    type: END_LOADING_MORE_PRODUCT_TYPES
}