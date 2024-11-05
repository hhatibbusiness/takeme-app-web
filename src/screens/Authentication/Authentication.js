import React, { useEffect, useState } from 'react';
import './Authentication.css';
import InputComponent from '../../components/InputComponent/InputComponent';
import emailImage from '../../assets/images/defaults/email.png'
import lockImage from '../../assets/images/defaults/lock.png';
import LoginButton from '../../components/LoginButton/LoginButton';
import logoImage from '../../assets/images/defaults/logo.png';
import GoogleImage from '../../assets/images/defaults/google.png';
import facebookImage from '../../assets/images/defaults/facebook.png';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../../store/actions/auth.actions';

const Authentication = ({
    paddingTop,
    authenticateUser,
    setBackBtn,
    setShowIcons
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        setShowIcons(false);
        setBackBtn(true);
        return () => {
            setShowIcons(true);
            setBackBtn(false);
        }
    }, []);

    const emailButtonClickHandler = () => {
        const userData = {
            email,
            password
        };

        authenticateUser(userData);
    }

    return (
        <div style={{paddingTop: `${paddingTop + 40}px`}} className='Authentication'>
            <div className='Authentication__message'>
                <p>انضم لنا لتحصل على ما ترغب به و تحتاجه
                بسرعة وسهولة، ولتزيد من سعادتك</p>
            </div>
            <div className='Authentication__container'>
                <div className='Authentication__element'>
                    <InputComponent
                        icon={emailImage}
                        type='text'
                        placeholder={'الايميل للدخول او الانضمام'}
                        value={email}
                        setValue={setEmail}
                    />
                </div>
                <div className='Authentication__element'>
                    <InputComponent
                        icon={lockImage}
                        type='password'
                        placeholder={'كلمة المرور'}
                        value={password}
                        setValue={setPassword}
                    />
                </div>
                <div style={{marginTop: '40px'}} className='Authentication__button'>
                    <LoginButton
                        value={'ادخل باستخدام تيكمي'}
                        icon={logoImage}
                        backColor={'#07AB83'}
                        color={'white'}
                        borderColor={'transparent'}
                        separatorColor={'white'}
                        fontWeight={700}
                        clickFun={emailButtonClickHandler}
                    />
                </div>
            </div> 
            <div className='Authentication__password--reset'>
                <p>في حال لديك حساب يمكنك <span>تغيير كلمة المرور</span> </p>
            </div>
            <div className='Authentication__or'>
                <div className='Authentication__hl'></div>
                <span>أو</span>
                <div className='Authentication__hl'></div>

            </div>
            <div className='Authentication__button'>
                <LoginButton
                    icon={GoogleImage}
                    value={"ادخل باستخدام جوجل"}
                    color={'#666666'}
                    backColor={'white'}
                    borderColor={'#E5E5E5'}
                    separatorColor={'#E5E5E5'}
                    fontWeight={400}
                />
            </div>
            <div className='Authentication__button'>
                <LoginButton
                    icon={facebookImage}
                    value={"ادخل باستخدام فيسبوك"}
                    color={'white'}
                    backColor={'#1877F2'}
                    borderColor={'#E5E5E5'}
                    separatorColor={'#E5E5E5'}
                    fontWeight={400}
                />
            </div>
            <div className='Authentication__conditions'>
                <p>
                    <span>عند انضمامك لنا أو تسجيلك معنا, فإنك توافق على </span>
                    <span onClick={e => {
                        navigate('/contract')
                    }} className='Authentication__conditions--link'>شروط الخدمة </span>
                    <span>و</span>
                    <span className='Authentication__conditions--link'>سياسية الخصوصية </span>
                    <span>الخاصة بنا.</span>
                </p>
            </div>
        </div>
    )
}

export default connect(null, {authenticateUser}) (Authentication);