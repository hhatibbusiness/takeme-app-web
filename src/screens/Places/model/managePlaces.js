//import  { BaseURL, AUTH_TOKEN}  from "../assets/constants/Base.js"
//import axios from 'axios';

function generateRandomPlaces(count) {
    const randomString = (length) => Math.random().toString(36).substring(2, 2 + length);
    const randomDate = () => new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();

    return Array.from({ length: count }, () => ({
        id: Math.floor(Math.random() * 1000),
        name: randomString(10),
        description: randomString(20),
        createdDate: randomDate(),
    }));
}

export async function addPlace(object) {
    console.log("AddPlace", object)
}

export async function EditPlace(object) {
    console.log("EditPlace", object)
}

export async function getPlaces({page}){
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Fetching places for page ${page}`);
    return generateRandomPlaces(10);
}

export async function searchPlacesAPI({searchText, page, sortType}){
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateRandomPlaces(10);
}

export async function DeletePlace({ PlaceID }){
    console.log("Delete", PlaceID)
}