import axios from "axios";
import { AUTH_TOKEN, BaseURL } from "../../../assets/constants/Base";

export async function GetProfileData(mLocale, localeId) {
  const url = `${BaseURL}/users/personal/profile?mLocale=${mLocale}&localeId=${localeId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': AUTH_TOKEN
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
}