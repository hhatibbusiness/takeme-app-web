import  { BaseURL }  from "../assets/constants/Base.js"
import axios from 'axios';


export async function getNeeds(page, isAscending=true) {
    const locale = "ar"
    const itemsCount = 0
    const url = `${BaseURL}/categories/list?locale=${locale}&page=${page}&itemsCount=${itemsCount}&ascending=${isAscending}`

    try {
        const response = await axios.get(url, {timeout: 5000})
        return response.data['output']
    }
    catch (error) {
        console.log("TIME EXCEED", error)
        return [];
    }
}


/// Search Needs by name
export async function searchNeed({ name }) {
    const locale = "ar"
    const url = `${BaseURL}/categories/search?locale=${locale}&searchText=${name}`
    
    try {
        const response = await axios.get(url, {timeout: 5000})
        return response.data['output']
    }
    catch (error) {
        console.log(error)

    }
}
