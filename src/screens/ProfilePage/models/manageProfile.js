import axios from "axios";
import { AUTH_TOKEN } from "../../../assets/constants/Base";

export default async function GetProfileData(mLocale, localeId) {
  const url = `http://191.96.1.25:8080/app_test/endpoints/users/personal/profile?mLocale=${mLocale}&localeId=${localeId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': {AUTH_TOKEN}
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
}