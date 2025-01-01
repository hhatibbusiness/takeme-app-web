import React, { useEffect, useRef, useState } from 'react';
import './ConfirmEmail.css';
import { useParams } from 'react-router-dom';
import emailConfirm from '../../../assets/images/auth/email-confirm.png';
import { useSSR } from 'react-i18next';
import LoginButton from '../../../components/LoginButton/LoginButton';
import axios from 'axios';
import { BASE_URL } from '../../../utls/assets';
import {connect} from "react-redux";
import { use } from 'react';

const ConfirmEmail = ({ paddingTop, locale, setBackBtn, setShowIcons, confirmHandler }) => {
    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [forth, setForth] = useState('');
    const [fifth, setFifth] = useState('');
    const [sixth, setSixth] = useState('');
    
    const params = useParams();
    const firstRef = useRef();
    const secondRef = useRef();
    const thirdRef = useRef();
    const forthRef = useRef();
    const fifthRef = useRef();
    const sixthRef = useRef()

    useEffect(() => {
        setBackBtn(true);
        setShowIcons(false);

        return () => {
            setBackBtn(false);
            setShowIcons(true);
        }
    }, []);

    return (
        <div
            style={{ paddingTop: `${paddingTop }px`}}
            className='ConfirmEmail'
        >
            <p className='ConfirmEmail__title'>تأكيد الايميل</p>
            <img
                src={emailConfirm}
            />
            <p className='ConfirmEmail__message'>
                <span className='ConfirmEmail__message--first'>للتأكد من ايميلك ارسلنا لك رمز للايميل </span>
                <a className='ConfirmEmail__email' href={`mailto:${params.email}`}>{params.email} </a>
                <span>اذا ممكن انسخ الرمز و ضعه هنا.</span>
            </p>
            <div className='ConfirmEmail__btns'>
                <div className='ConfirmEmail__btn'>
                    <input ref={firstRef} type='text' value={first} onChange={e => {
                        setFirst(prevState => {
                            console.log('Reached!');
                            return e.target.value.length > 1 ? prevState : e.target.value;
                        })
                        if (e.target.value.length > first) {
                            secondRef.current?.focus();
                        } else if(e.target.value.length < first) {
                             
                        }
                    }} />
                </div>
                <div className='ConfirmEmail__btn'>
                    <input ref={secondRef} type='text' value={second} onChange={e => {
                        setSecond(prevState => {
                            console.log('Reached!');
                            
                            return e.target.value.length > 1 ? prevState : e.target.value;
                        })
                        if (e.target.value.length > second) {
                            thirdRef.current?.focus();
                        } else if(e.target.value.length < second) {
                            firstRef.current?.focus();
                        }
                    }} />
                </div>
                <div className='ConfirmEmail__btn'>
                    <input ref={thirdRef} type='text' value={third} onChange={e => {
                        setThird(prevState => {
                            console.log('Reached!');
                            
                            return e.target.value.length > 1 ? prevState : e.target.value;
                        })
                        if (e.target.value.length > third) {
                            forthRef.current?.focus();
                        } else if(e.target.value.length < third) {
                            secondRef.current?.focus();
                        }
                    }} />
                </div>
                <div className='ConfirmEmail__btn'>
                    <input ref={forthRef} type='text' value={forth} onChange={e => {
                        setForth(prevState => {                            
                            return e.target.value.length > 1 ? prevState : e.target.value;
                        })
                        if (e.target.value.length > forth) {
                            fifthRef.current?.focus();
                        } else if (e.target.value.length < forth) {
                            thirdRef.current?.focus();
                        }
                    }} />
                </div>
                <div className='ConfirmEmail__btn'>
                    <input ref={fifthRef} type='text' value={fifth} onChange={e => {
                        setFifth(prevState => {
                            console.log('Reached!');
                            return e.target.value.length > 1 ? prevState : e.target.value;
                        })
                        if (e.target.value.length > fifth) {
                            sixthRef.current?.focus();
                        } else if(e.target.value.length < fifth) {
                            forthRef.current?.focus();
                        }
                    }} />
                </div>
                <div className='ConfirmEmail__btn'>
                    <input ref={sixthRef} type='text' value={sixth} onChange={e => {
                        setSixth(prevState => {
                            console.log('Reached!');
                            return e.target.value.length > 1 ? prevState : e.target.value;
                        })
                        if (e.target.value.length > sixth) {
                            
                        } else if(e.target.value.length < sixth) {
                            fifthRef.current?.focus()
                        }
                    }} />
                </div>
            </div>
            <div className='ConfirmEmail__confirm'>
                <LoginButton
                    hasImage={false}
                    value={'تأكيد'}
                    icon={null}
                    backColor={'#07AB83'}
                    color={'white'}
                    borderColor={'transparent'}
                    separatorColor={'white'}
                    fontWeight={700}
                    clickFun={() => {
                        if (!first || !second || !third || !forth || !fifth || !sixth) return;
                        const data = {
                            email: params.email,
                            password: params.password,
                            code: `${first}${second}${third}${forth}${fifth}${sixth}`,
                            authType: 'email',
                            localeId: locale?.id
                        }
                        confirmHandler(data);
                    }}
                />
            </div>
            <div className='ConfirmEmail__resend'>
                <p className='ConfirmEmail__resend--message'>
                    <span className='ConfirmEmail__resend--regular'>إذا لم تستلم الرمز يمكنك طلب </span>
                    <span className='ConfirmEmail__resend--link'>إعادة ارسال الرمز.</span>
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale
})

export default connect(mapStateToProps) (ConfirmEmail);