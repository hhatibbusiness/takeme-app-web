import React, { useEffect, useRef } from 'react';
import FacebookLogin from 'react-facebook-login';
import LoginButton from '../LoginButton/LoginButton';
import { connect } from 'react-redux';
import { authenticateUser } from '../../store/actions/auth.actions';
import { useNavigate } from 'react-router-dom';
import './FacebookLogin.css';

const FacebookLoginButton = ({
    icon, 
    locale,
    value,
    color,
    backColor,
    borderColor,
    separatorColor,
    fontWeight,
    hasImage,
    authenticateUser
}) => {
    const facebookDefaultRef = useRef();
    const facebookCustomRef = useRef();

    const navigate = useNavigate();
    const responseFacebook = (response) => {
        console.log(response);
        if (response.id) {
            const data = {
                email: response.email,
                password: response.id,
                authType: 'facebook',
                locale: locale?.locale,
                navigate,
                localeId: locale?.id,
                accessToken: response.accessToken
            }

            console.log(response);
            
            authenticateUser(data);
        }
    };

    useEffect(() => {

    }, [])
        
    return (
        <div className='FacebookLogin'>
            <FacebookLogin
                appId="1097750034778649"
                fields="name,email"
                callback={responseFacebook}
                autoLoad={false}
                isMobile={false}
                cssClass="facebook-button"
                ref={facebookDefaultRef}
            />
            <div onClick={e => {
                console.log(facebookDefaultRef?.current);
                // facebookDefaultRef?.current?.click();
                document.querySelector('.facebook-button').click();
            }} className='FacebookLogin__custom'>
                <LoginButton
                    icon={icon}
                    value={value}
                    color={color}
                    backColor={backColor}
                    borderColor={borderColor}
                    separatorColor={separatorColor}
                    fontWeight={fontWeight}
                    hasImage={hasImage}
                    ref={facebookCustomRef}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    locale: state.categories.selectedLocale,
});

export default connect(mapStateToProps, {authenticateUser})(FacebookLoginButton);
