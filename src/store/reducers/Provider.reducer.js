import * as actionTypes from '../actions/action.types';

const initialState = {
    provider: {},
    galleryOpen: false,
    galleryProduct: {},
    loadingProvider: true
}

export default (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.FETCH_PROVIDER_DATA:
            const newProvidersCopy = action.provider;
                newProvidersCopy.products = {
                ...action.provider.products,
                "100": [
                    {
                        "id": 2,
                        "name": "جولة لساعة",
                        "description": {
                            "text": "text",
                            "list": [
                                {
                                    "imagePath": "string",
                                    "item": "string"
                                },
                                {
                                    "imagePath": "string",
                                    "item": "string"
                                },
                                {
                                    "imagePath": "string",
                                    "item": "string"
                                }
                            ],
                            "variables": [
                                {
                                    "iconPath": null,
                                    "key": null,
                                    "value": null
                                },
                                {
                                    "iconPath": null,
                                    "key": null,
                                    "value": null
                                },
                                {
                                    "iconPath": null,
                                    "key": null,
                                    "value": null
                                }
                            ],
                            "tags": [
                                "string",
                                "string",
                                "string"
                            ],
                            "comments": [
                                "string",
                                "string",
                                "string"
                            ]
                        },
                        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                        "comments": "السعر يشمل هدرخا فقط",
                        "productTypeId": 1,
                        "providerId": 1,
                        "rentDetails": null,
                        "saleDetails": {
                            "title": "تفاصيل البيع",
                            "price": 350,
                            "status": "null",
                            "priceMsg": "السعر 350 شيكل",
                            "statusMsg": "حالة المنتج null"
                        },
                        "images": [
                            {
                                "id": 3,
                                "productId": 2,
                                "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                                "comments": "",
                                "createdDate": null,
                                "updatedDate": null
                            },
                            {
                                "id": 4,
                                "productId": 2,
                                "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                                "comments": "",
                                "createdDate": null,
                                "updatedDate": null
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "name": "Scooter new",
                        "description": {
                            "text": "text",
                            "list": [
                                {
                                    "imagePath": "string",
                                    "item": "string"
                                },
                                {
                                    "imagePath": "string",
                                    "item": "string"
                                },
                                {
                                    "imagePath": "string",
                                    "item": "string"
                                }
                            ],
                            "variables": [
                                {
                                    "iconPath": null,
                                    "key": null,
                                    "value": null
                                },
                                {
                                    "iconPath": null,
                                    "key": null,
                                    "value": null
                                },
                                {
                                    "iconPath": null,
                                    "key": null,
                                    "value": null
                                }
                            ],
                            "tags": [
                                "string",
                                "string",
                                "string"
                            ],
                            "comments": [
                                "string",
                                "string",
                                "string"
                            ]
                        },
                        "navigateLink": "null",
                        "comments": "",
                        "productTypeId": 1,
                        "providerId": 1,
                        "rentDetails": {
                            "title": "تفاصيل الايجار",
                            "price": 50,
                            "rentUnit": "days",
                            "priceMsg": "سعر الايجار 50 شيكل لليوم",
                            "minTimForRent": 1,
                            "minimumforRentMsg": "الحد الادنى لمدة الاستئجار 1 ايام"
                        },
                        "saleDetails": null,
                        "images": []
                    },
                    {
                        "id": 1,
                        "name": "جولة للفرد والزوج",
                        "description": {
                            "text": "TEST",
                            "list": [],
                            "variables": [],
                            "tags": [],
                            "comments": []
                        },
                        "navigateLink": "null",
                        "comments": "السعر لكل المجموعة",
                        "productTypeId": 1,
                        "providerId": 1,
                        "rentDetails": {
                            "title": "تفاصيل الايجار",
                            "price": 123123,
                            "rentUnit": "Days",
                            "priceMsg": "سعر الايجار 123.123 شيكل للساعة",
                            "minTimForRent": 123123,
                            "minimumforRentMsg": "الحد الادنى لمدة الاستئجار 123.123 ساعات"
                        },
                        "saleDetails": {
                            "title": "تفاصيل البيع",
                            "price": 400,
                            "status": "USED",
                            "priceMsg": "السعر 400 شيكل",
                            "statusMsg": "حالة المنتج USED"
                        },
                        "images": [
                            {
                                "id": 16,
                                "productId": 1,
                                "imagePath": "https://takeme-all.com/app/resources/providers/0506331658/products/images/1/1/http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                                "comments": "",
                                "createdDate": null,
                                "updatedDate": null
                            },
                            {
                                "id": 17,
                                "productId": 1,
                                "imagePath": "https://takeme-all.com/app/resources/providers/0506331658/products/images/1/1/http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                                "comments": "",
                                "createdDate": null,
                                "updatedDate": null
                            }
                        ]
                    }
                ]
            }
            return {
                ...state,
                provider: newProvidersCopy
            }
        case actionTypes.OPEN_PROVIDER_GALLERY:
            return {
                ...state,
                galleryOpen: true,
                galleryProduct: action.product
            }
        case actionTypes.CLOSE_PROVIDER_GALLERY:
            return {
                ...state,
                galleryOpen: false,
                galleryProduct: {}
            }
        case actionTypes.START_FETCHING_PROVIDER:
            return {
                ...state,
                loadingProvider: true
            }
        case actionTypes.END_FETCHING_PROVIDER:
            return {
                ...state,
                loadingProvider: false
            }
        default:
            return state;
    }
}