import React, {useCallback, useEffect, useRef, useState} from 'react';
import './ConfirmEmail.css';
import { useParams } from 'react-router-dom';
import emailConfirm from '../../../assets/images/auth/email-confirm.png';
import LoginButton from '../../../components/LoginButton/LoginButton';
import {connect} from "react-redux";
import {addAlert, removeAlert} from "../../../store/actions/alert.actions";
import axios from "axios";
import {BASE_URL} from "../../../utls/assets";

const ConfirmEmail = ({ paddingTop, removeAlert, y, setY, topValue,setTopValue, navHeight, bodyContainerRef, locale, addAlert, setBackBtn, setShowIcons, confirmHandler }) => {
    const [counter, setCounter] = useState(0);
    const [counterDate, setCounterDate] = useState(() => {
        // Retrieve stored date and parse correctly
        const storedDate = localStorage.getItem('TAKEME_COUNTER_DATE');
        return storedDate ? new Date(storedDate) : null;
    });

    const handleWindowScroll = useCallback( e => {
        if(Math.floor(y) > Math.floor(window.scrollY)) {
            setY(window.scrollY);
            if(topValue + (y - window.scrollY) > 0) {
                return setTopValue(0);
            }
            setTopValue(topValue + (y - window.scrollY));
        } else if(Math.floor(y) < Math.floor(window.scrollY)) {
            if(window.scrollY - y > Math.abs(navHeight) - Math.abs(topValue)) {
                setY(window.scrollY);
                return setTopValue(-navHeight);
            };
            if(window.scrollY - y + topValue < -navHeight) {
                setY(window.scrollY);
                return setTopValue(-navHeight);
            };
            setTopValue(topValue - (window.scrollY - y));
            setY(window.scrollY);
        }
    }, [y]);

    useEffect(() => {
        const container = bodyContainerRef.current;
        if(container) {
            setY(window.scrollY);
            window.addEventListener('scroll', handleWindowScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        }
    }, [handleWindowScroll, bodyContainerRef.current]);


    useEffect(() => {
        if (!counterDate || isNaN(counterDate.getTime())) return;

        const now = new Date();
        const elapsedTime = Math.floor((now - counterDate) / 1000);
        const remainingTime = Math.max(30 - elapsedTime, 0);
        setCounter(remainingTime);

        if (remainingTime > 0) {
            const interval = setInterval(() => {
                setCounter(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [counterDate]);

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
    const sixthRef = useRef();

    useEffect(() => {
        setBackBtn(true);
        setShowIcons(false);

        return () => {
            setBackBtn(false);
            setShowIcons(true);
        }
    }, []);

    useEffect(() => {
        return () => {
            removeAlert();
        }
    }, []);

    return (
        <div
            style={{ paddingTop: `${paddingTop }px`}}
            className='ConfirmEmail'
        >
            <p className='ConfirmEmail__title'>تأكيد الايميل</p>
            <img
                className={'ConfirmEmail__image'}
                src={emailConfirm}
            />
            <p className='ConfirmEmail__message'>
                <span className='ConfirmEmail__message--first'>للتأكد من ايميلك ارسلنا لك رمز للايميل </span>
                <a className='ConfirmEmail__email' target={'_blank'} href={`https://mail.google.com`}>{params.email} </a>
                {/*<a className='ConfirmEmail__email' href={`mailto:${params.email}`}>{params.email} </a>*/}
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
                    {
                        counterDate && ((new Date().getTime() - new Date(counterDate).getTime()) / 1000 <= 30) ? (
                            <>
                                <p className={'ConfirmEmail__counter--message'}>يمكنك اعادة الارسال بعد </p>
                                <p className={'ConfirmEmail__counter--count'}>{counter} ثانية</p>
                            </>
                        ) : (
                            <>
                                <span className='ConfirmEmail__resend--regular'>إذا لم تستلم الرمز يمكنك طلب </span>
                                <span onClick={async () => {
                                    try {
                                        const data = {
                                            localeId: locale?.id,
                                            userAuthenticationRequestDto: {
                                                authType: 'email',
                                                authValue: params.email,
                                                password: 'fldjakdl'
                                            }
                                        }
                                        const res = await axios.post(`${BASE_URL}endpoints/users/send-email-verify-code?mLocale=${locale?.locale}&email=${params.email}`);
                                        if(res.status == 200) {
                                            const currentDate = new Date();
                                            localStorage.setItem('TAKEME_COUNTER_DATE', currentDate);
                                            setCounterDate(currentDate);
                                            // addAlert({
                                            //     msg: 'تم ارسال الكود بنجاح',
                                            //     alertType: 'success'
                                            // });
                                        }
                                    } catch (e) {
                                        addAlert({
                                            msg: e?.response?.data?.message,
                                            alertType: 'danger'
                                        })
                                    }
                                }} className='ConfirmEmail__resend--link'>إعادة ارسال الرمز.</span>
                            </>
                        )
                    }
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale
})

export default connect(mapStateToProps, {addAlert, removeAlert}) (ConfirmEmail);