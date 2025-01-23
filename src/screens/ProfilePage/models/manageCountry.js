import axios from "axios";
import { AUTH_TOKEN, BaseURL } from "../../../assets/constants/Base";

/// Countries APIs
export async function getListCountry({mLocale='ar_SA', page=0, isAscending=true, itemCount=50}) {
    try {
        const url = `${BaseURL}/countries/list?mLocale=${mLocale}&page=${page}&itemCount=${itemCount}&ascending=${isAscending}`;
        const res = await axios.get(url);
        return res.data.output;    
    } catch (error) {
        console.log("Error", error)
    }
}
