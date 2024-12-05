import React, { useEffect } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import logoImage from '../../assets/images/defaults/logo.png';
import LoginButton from '../LoginButton/LoginButton';
import GoogleImage from '../../assets/images/defaults/google.png';
import axios from 'axios';
import { authenticateUser } from '../../store/actions/auth.actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  authenticateUser
}) {
  const navigate = useNavigate();
  
  const login = useGoogleLogin({
    //* onSucess and OnError Must take Function to what happened for both */
    onSuccess: async (tokenResponse) => {
      console.log('Login successful:', tokenResponse);
      try {
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

          console.log(data)

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
      clickFun={login}
    />
  );
}

const mapStateToProps = state => ({
  locale: state.categories.selectedLocale
})

//// Main Wrapped Compomet
export default connect(mapStateToProps, { authenticateUser })(function GoogleLogin({ locale, authenticateUser, loginUserUsingGoogle, icon, value, color, backColor, borderColor, separatorColor, fontWeight, hasImage, login }) {
  //// this Client Id must chnage with TakeMe API Client Id
  const CLIENT_ID = '411892016185-u17l10r5t0p7t2ovov351mkugufj0uh4.apps.googleusercontent.com'
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
      />
    </GoogleOAuthProvider>
  )
});