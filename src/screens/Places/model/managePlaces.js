import  { BaseURL, AUTH_TOKEN}  from "../../../assets/constants/Base";
import axios from 'axios';

// Add Places API
export async function addPlace(object) {
    try {
        const url = `${BaseURL}/places/add?mLocale=ar_SA`;
        const headers = {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': AUTH_TOKEN
        }

        const res = await axios.post(url, object, { headers });
        return res.data;
    } catch (error) {
        console.log("Error", error)
    }
}

// Get the List of Places
export async function getPlaces({mLocale='ar_SA', page, isAscending=true, itemCount=10}) {
    try {
        const url = `${BaseURL}/places/list?mLocale=${mLocale}&page=${page}&itemCount=${itemCount}&ascending=${isAscending}`;
        const res = await axios.get(url);
        return res.data;    
    } catch (error) {
        console.log("Error", error)
    }
}

// Search Places API with Search Key
export async function searchPlacesAPI({ searchkey, page }) {
    try {
        const url = `${BaseURL}/places/search?mLocale=ar_SA&page=${page}&itemCount=20&searchKey=${searchkey}`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.log("Error", error)
    }
}

// Edit the place API with id and object
export async function EditPlace({mLocale='ar_SA', object}) {
    try {
        const url = `${BaseURL}/places/update?mLocale=${mLocale}`;
        const headers = {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': AUTH_TOKEN
        }

        console.log("EDIT", object)
        const res = await axios.put(url, object, { headers });
        console.log("EDIT Response", res)
        return res.data;
    } catch (error) {
        console.log("Error", error)
    }
}

// Delete the Place API with PlaceID
export async function DeletePlace({ PlaceID }){
    try {
        const url = `${BaseURL}/places/delete?mLocale=ar_SA&placeId=${PlaceID}`;
        const headers = {
            'accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': AUTH_TOKEN
        }

        const res = await axios.delete(url, { headers });
        return res.data;
    } catch (error) {
        console.log("Error", error)
    }
}



/// Countries APIs
export async function getCountries({mLocale='ar_SA', page, isAscending=true, itemCount=10}) {
    try {
        const url = `${BaseURL}/countries/list?mLocale=${mLocale}&page=${page}&itemCount=${itemCount}&ascending=${isAscending}`;
        const res = await axios.get(url);
        return res.data;    
    } catch (error) {
        console.log("Error", error)
    }
}

export async function searchCountriesAPI({ searchkey, page }) {
    try {
        const url = `${BaseURL}/countries/search?mLocale=ar_SA&page=${page}&itemCount=20&searchKey=${searchkey}`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.log("Error", error)
    }
}



/// Locales APIs
export async function getLocales({mLocale='ar_SA', page, sortType='NEWEST'}) {
    try {
        const url = `${BaseURL}/locales/list?mLocale=${mLocale}&page=${page}&sortType=${sortType}`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.log("Error", error)
    }
}

export async function searchLocalesAPI({ searchkey, page, sortType='NEWEST' }) {
    try {
        const url = `${BaseURL}/locales/search?mLocale=ar_SA&page=${page}&searchKey=${searchkey}&sortType=${sortType}`;
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.log("Error", error)
    }
}