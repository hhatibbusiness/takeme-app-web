import axios from "axios";
import {
    CHANGE_CURRENT_PROVIDER_CATEGORY_ID,
    CLOSE_PROVIDER_GALLERY,
    END_FETCHING_PROVIDER, END_FETCHING_PROVIDER_CATEGORIES,
    END_FETCHING_PROVIDER_PRODUCTS_TYPES,
    FETCH_PRODUCTS_TYPES_PRODUCTS, FETCH_PROVIDER_CATEGORIES,
    FETCH_PROVIDER_DATA,
    FETCH_PROVIDER_PRODUCTS_TYPES,
    INCREASE_PROVIDER_PRODUCT_TYPES_PAGE,
    OPEN_PROVIDER_GALLERY,
    RESET_PROVIDER_PRODUCT_TYPES_DATA,
    START_FETCHING_PROVIDER,
    START_FETCHING_PROVIDER_CATEGORIES,
    START_FETCHING_PROVIDER_PRODUCTS_TYPES,
    START_FETCHING_PROVIDERS_PRODUCTS
} from "./action.types";
import { BASE_URL } from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";
import allCategoryImage from "../../assets/images/all-icon.jpg";

export const fetchProviderData = (lan, id, filter, navigate) => async dispatch => {
    try {
        dispatch(startFetchingProvider);
        // console.log('Fetching Provider Data')
        const data = {
            providerId: id,
            categoryListIds: null
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const res = await axios.get(`${BASE_URL}endpoints/provider-details?locale=${lan}&providerId=${id}&filterByAction=${filter}`);
        // const res = await axios.get(`${BASE_URL}endpoints/products/get-products-by-category?locale=${lan}&filterByAction=${filter}`, headers, data);
        // const res = await fetch(`${BASE_URL}endpoints/products/get-products-by-category`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
        // console.log(res);
        if(res.status == 200 && res.data.status == true && Object.keys(res.data.output).length != 0 && res.data.output != null) {
            dispatch({
                type: FETCH_PROVIDER_DATA,
                provider: res.data.output
            });
        }
        if(res?.data?.output == null) {

        }
        dispatch(endFetchingProvider);
    } catch (e) {
        if(e?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login');
        }
        console.error(e.message);
        dispatch(endFetchingProvider);
    }
}

export const startFetchingProviderProductsTypes = {
    type: START_FETCHING_PROVIDER_PRODUCTS_TYPES
}

export const endFetchingProviderProductsTypes = {
    type: END_FETCHING_PROVIDER_PRODUCTS_TYPES
}

export const fetchProviderProductsTypes = data => async dispatch => {
    try {
        if(data.page == 0) dispatch(startFetchingProviderProductsTypes);
        const formData = {
            providerId: data.providerId,
            categoryListIds: data.categoryListIds,
            productTypeId: data.productTypeId
        };
        const res = await axios.post(`${BASE_URL}endpoints/provider-data?locale=ar&page=${data.page}&itemsCount=10`, formData);
        // console.log(res);
        if(!formData.productTypeId) {
            // console.log('ProductType is null', data.productTypeId);
            dispatch({
                type: FETCH_PROVIDER_PRODUCTS_TYPES,
                productTypes: res.data.output
            });
        } else {
            // console.log('ProductType is not null');
            dispatch({
                type: FETCH_PRODUCTS_TYPES_PRODUCTS,
                productType: res.data.output[0]
            });
        }
        dispatch(increaseProviderProductTypesPage());
        dispatch(endFetchingProviderProductsTypes);
    } catch(e) {
        console.error(e.message);
    }
}

export const increaseProviderProductTypesPage = () => {
    return {
        type: INCREASE_PROVIDER_PRODUCT_TYPES_PAGE
    }
}

export const resetProviderProductTypesData = () => {
    return {
        type: RESET_PROVIDER_PRODUCT_TYPES_DATA
    }
}

// export const fetchProviderData = (lan, id, filter, navigate) => async dispatch => {
//     const res = JSON.parse(
//         JSON.stringify(
//     {
//         "status": true,
//         "message": "تم الحصول على أصحاب منتجات أو خدمات بنجاح",
//         "output": {
//         "id": 29,
//             "providerId": 15,
//             "name": "Mo Ziko12",
//             "phoneCountryCode": "972",
//             "phone": "0506331703",
//             "whatsappLink": "https://wa.me/9720506331658",
//             "navigateLink": "test",
//             "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
//             "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
//             "orderMinDuration": "24 hours",
//             "country": "israel",
//             "city": "Ghajar",
//             "email": null,
//             "activeStatus": "active",
//             "statusDetails": "ssss",
//             "ratingsScore": null,
//             "ratingsCount": 0,
//             "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
//             "productTypeId": null,
//             "productTypeTitle": null,
//             "totalProducts": 1,
//             "totalProductsOfTypeId": 0,
//             "localtionMsg": "Ghajar",
//             "productsCountMsg": "يوجد لدي 1 منتجات",
//             "ratingMsg": "ارسل تقييم",
//             "products": {
//             "23": [
//                 {
//                     "id": 13,
//                     "name": "ddddupdateVIP update",
//                     "description": {
//                         "text": "text",
//                         "list": [
//                             {
//                                 "imagePath": "string",
//                                 "item": "string"
//                             },
//                             {
//                                 "imagePath": "string",
//                                 "item": "string"
//                             },
//                             {
//                                 "imagePath": "string",
//                                 "item": "string"
//                             }
//                         ],
//                         "variables": [
//                             {
//                                 "iconPath": "string",
//                                 "key": "key",
//                                 "value": "value"
//                             },
//                             {
//                                 "iconPath": "string",
//                                 "key": "key",
//                                 "value": "value"
//                             },
//                             {
//                                 "iconPath": "string",
//                                 "key": "key",
//                                 "value": "value"
//                             }
//                         ],
//                         "tags": [
//                             "string",
//                             "string",
//                             "string"
//                         ],
//                         "comments": [
//                             "string",
//                             "string",
//                             "string"
//                         ]
//                     },
//                     "navigateLink": "http://kfgjgjhhfg",
//                     "comments": "טעימות כולל הדרכה והסברים על הכפר: 200 שח לבן אדם (המחירים הם לבן אדם)",
//                     "productTypeId": 23,
//                     "providerId": 15,
//                     "rentDetails": null,
//                     "saleDetails": {
//                         "title": "تفاصيل البيع",
//                         "price": 150,
//                         "status": "NEW",
//                         "priceMsg": "السعر 150 شيكل",
//                         "statusMsg": "حالة المنتج NEW"
//                     },
//                     "images": []
//                 }
//             ]
//         }
//     }
//     }
//         )
//     )
//
//             dispatch({
//                 type: FETCH_PROVIDER_DATA,
//                 provider: res.output
//             });
//             dispatch(endFetchingProvider);
//
// }

export const openProviderGallery = product => ({
    type: OPEN_PROVIDER_GALLERY,
    product: product
});

export const closeProviderGallery = product => ({
    type: CLOSE_PROVIDER_GALLERY,
});

export const startFetchingProvider = {
    type: START_FETCHING_PROVIDER
}

export const endFetchingProvider = {
    type: END_FETCHING_PROVIDER
}

export const startFetchingProviderCategories = {
    type: START_FETCHING_PROVIDER_CATEGORIES
}

export const endFetchingProviderCategories = {
    type: END_FETCHING_PROVIDER_CATEGORIES
}

export const fetchProviderCategories = data => async dispatch => {
    try {
        dispatch(startFetchingProviderCategories);
        const res = await axios.get(`${BASE_URL}endpoints/categories/list-no-empty?locale=${data.lan}&providerId=${data.providerId}`);
        const allCategory =       {
            id: 0,
            name: 'الكل',
            description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
            imagePath: allCategoryImage,
            sortIndex: 1,
            createdDate: new Date(),
            updatedDate: new Date(),
            imageName: 'all.jpg'
        };

        const categories = [
            allCategory,
            ...res.data.output
        ];

        dispatch(changeCurrentId(0));

        dispatch({
            type: FETCH_PROVIDER_CATEGORIES,
            categories
        });

        dispatch(endFetchingProviderCategories);
    } catch (e) {
        console.error(e.message);
    }
}

export const changeCurrentId = id => {
    return {
        type: CHANGE_CURRENT_PROVIDER_CATEGORY_ID,
        id
    }
}