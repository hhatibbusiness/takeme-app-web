import axios from "axios";
import { AUTH_TOKEN, BaseURL } from "../../../assets/constants/Base";

/// Countries APIs
export async function SearchPlaces({mLocale='ar_SA', page=0, searchKey, itemCount=50}) {
    try {
        const url = `${BaseURL}/places/search?mLocale=${mLocale}&page=${page}&itemCount=${itemCount}&searchKey=${searchKey}`;
        const res = await axios.get(url);
        return res.data.output;
    } catch (error) {
        console.log("Error", error)
    }
}
