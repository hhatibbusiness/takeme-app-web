import axios from "axios";
import { BaseURL } from "../../../assets/constants/Base";

/// Countries APIs
export async function SearchPlaces({mLocale='ar_SA', page=0, searchKey, itemCount=50, countryID=null} = {}) {
    try {
        const url = `${BaseURL}/places/search?mLocale=${mLocale}&page=${page}&itemCount=${itemCount}&searchKey=${searchKey}&countryId=${countryID}`;
        const res = await axios.get(url);
        return res.data.output;
    } catch (error) {
        console.log("Error", error)
    }
}


/// Countries APIs
export async function countryList({mLocale='ar_SA', page=0, itemCount=1} = {}) {
    try {
        const url = `${BaseURL}/countries/list?mLocale=${mLocale}&page=${page}&itemCount=${itemCount}`;
        const res = await axios.get(url);
        return res.data.output;
    } catch (error) {
        console.log("Error", error)
    }
}

