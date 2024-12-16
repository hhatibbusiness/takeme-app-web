import  { BaseURL, AUTH_TOKEN}  from "../assets/constants/Base.js"
import axios from 'axios';


export async function getDesires({page, isAscending=true}) {
    const locale = "ar"
    const itemsCount = 0
    const url = `${BaseURL}/products-types/list?locale=${locale}&page=${page}&itemsCount=${itemsCount}&ascending=${isAscending}`

    try {
        const response = await axios.get(url, {timeout: 5000})
        return response.data['output']
    }
    catch (error) {
        console.log("TIME EXCEED", error)
        return [];
    }
}

/// GET Desire By ID
export async function getDesireID({ id }) {
    const locale = "ar"
    const url = `${BaseURL}/products-types/get?locale=${locale}&id=${id}`
    
    try {
        const response = await axios.get(url, {timeout: 5000})
        return response.data['output']
    }
    catch (error) {
        console.log(error)

    }
}

/// GET Desire With Needs By ID
export async function getDesireWithNeeds({ id }) {
    const locale = "ar"
    const url = `${BaseURL}/products-types/get-with-categories?locale=${locale}&id=${id}`
    
    try {
        const response = await axios.get(url, {timeout: 5000})
        return response.data['output']
    }
    catch (error) {
        console.log(error)

    }
}

/// Search Desire by name
export async function searchDesire({ name }) {
    const locale = "ar"
    const url = `${BaseURL}/products-types/search_by_name?locale=${locale}&searchText=${name}`
    
    try {
        const response = await axios.post(url, {timeout: 5000})
        return response.data['output'] || []
    }
    catch (error) {
        console.log(error)
        return []
    }
}

/// ADD Desire
export async function addDesire({ name, description, needs, imagePath ,sortIndex }) {
    const locale = "ar"
    const url = `${BaseURL}/products-types/add?locale=${locale}`
    
    const data = {
        categoryIds: needs,
        productType: {
            "name": name,
            "description": description,
            "id": null,
            "imagePath": imagePath,
            "sortIndex": sortIndex,
        },
    }
    try {
        const response = await axios.post(
            url, 
            data, 
            {headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN }})
        
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}


/// EDit Desire
export async function EditDesire({ id, name, description, needs, imagePath, sortIndex }) {
    const locale = "ar"
    const url = `${BaseURL}/products-types/update?locale=${locale}`
    
    const data = {
        categoryIds: needs,
        productType: {
            "name": name,
            "description": description,
            "id": id,
            "imagePath": imagePath,
            "sortIndex": sortIndex,
        },
    }
    try {
        const response = await axios.put(url, data,
            {headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN }})
        
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}


/// DELETE Desire
export async function DeleteDesire({ DesireID }) {
    const locale = "ar"
    const url = `${BaseURL}/products-types/delete?locale=${locale}&id=${DesireID}`

    try {
        const response = await axios.delete(url, {headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN }})
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}