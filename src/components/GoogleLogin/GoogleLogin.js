import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import LoginButton from '../LoginButton/LoginButton';
import axios from 'axios';
import { authenticateUser } from '../../store/actions/auth.actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {removeAlert} from "../../store/actions/alert.actions";

/**   MUST READ THIS BEFORE START:
 * @component This Component is Default and must not take params for Security issues.
 * @description This Component is for Google Login Button and You have to Make the Following:
 *      * 1- Make Sure to Install @react-oauth/google.
 *      * 2- Chnage the button with your Custom One and Make OnClick Event to login() function.
 *      * 3- Create OnSucess and Fail Functions.
 *      * 4- Make API Requests with response.access_token.
*/

function LoginButtonComponent({
  icon, 
  locale,
  value,
  googleAction,
  color,
  backColor,
  borderColor,
  separatorColor,
  fontWeight,
  hasImage,
  authenticateUser,
    removeAlert
}) {
  const navigate = useNavigate();
  
  const login = useGoogleLogin({
    //* onSuccess and OnError Must take Function to what happened for both */
    onSuccess: async (tokenResponse) => {
      try {
        removeAlert();
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        });
        if (res.status == 200) {
          const data = {
            email: res.data.email,
            password: res.data.sub,
            locale: locale?.locale,
            authType: 'google',
            navigate,
            localeId: locale?.id,
            accessToken: tokenResponse.access_token
          }

          googleAction(data);
        }
      } catch (e) {
        console.error(e.response?.data?.error);
      }
    },
    onError: () => {
      console.log('Login failed');
    },
  });

  return (
    /////*************/ You must but your Custom button Component here instead of that.
    <LoginButton
      icon={icon}
      value={value}
      color={color}
      backColor={backColor}
      borderColor={borderColor}
      separatorColor={separatorColor}
      fontWeight={fontWeight}
      hasImage={hasImage}
      clickFun={() => {
        removeAlert();
        login()
      }}
    />
  );
}

const mapStateToProps = state => ({
  locale: state.categories.selectedLocale
})

//// Main Wrapped Compomet
export default connect(mapStateToProps, { authenticateUser, removeAlert })(function GoogleLogin({ locale, authenticateUser, loginUserUsingGoogle, icon, value, color, backColor, borderColor, separatorColor, fontWeight, hasImage, login }) {
  //// this Client Id must chnage with TakeMe API Client Id
  const CLIENT_ID = '535326779667-n3hrspqimhq7meia56fpnvad3a3putsp.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <LoginButtonComponent
        icon={icon}
        value={value}
        color={color}
        backColor={backColor}
        borderColor={borderColor}
        separatorColor={separatorColor}
        fontWeight={fontWeight}
        hasImage={hasImage}
        login={login}
        googleAction={authenticateUser}
        locale={locale}
        removeAlert={removeAlert}
      />
    </GoogleOAuthProvider>
  )
});