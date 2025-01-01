import axios from "axios";
import { AUTH_TOKEN, BaseURL } from "../../../assets/constants/Base";


export async function GetProfileData({mLocale, localeId}) {
    const url = `${BaseURL}/users/personal/profile?mLocale=${mLocale}&localeId=${localeId}`;
    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

export async function UpdateGenderAPI({mLocale, userId, gender}) {
    const url = `${BaseURL}/personal/profiles/update-gender?mLocale=${mLocale}&userId=${userId}&gender=${gender}`
    try {
        const response = await axios.put(url, {
            headers: {
              'Authorization': AUTH_TOKEN
            }
        })

        return response
    } catch (error) {
        console.log("ERROR UPDATE GENDER", error)
    }
    
}

export async function UpdateNameAPI({ mLocale, LocaleId, userId, name }) {
    const url = `${BaseURL}/base/profiles/update-name?mLocale=${mLocale}&localeId=${LocaleId}&baseProfileId=${userId}&name=${name}`
    try {
        const response = await axios.put(url, {
            headers: {
              'Authorization': AUTH_TOKEN
            }
        })
        return response
    } catch (error) {
        console.log("ERROR UPDATE Name", error)
    }
    
}

export async function UpdateBirthDateAPI({ mLocale, userId, BirthOfDate }) {
    const url = `${BaseURL}/personal/profiles/update-date-of-birth?mLocale=${mLocale}&userId=${userId}`
    try {
        const response = await axios.put(url, BirthOfDate)

        return response
    } catch (error) {
        console.log("ERROR UPDATE BirthDate", error)
    }
    
}

export async function DeleteProfile({mLocale, userId}) {
    const url = `${BaseURL}/users/delete?mLocale=${mLocale}&userId=${userId}`
    try {
        const response = await axios.delete(url)
        return response
    } catch (error) {
        console.log("ERROR IN DELETE : ", error)
    }

}