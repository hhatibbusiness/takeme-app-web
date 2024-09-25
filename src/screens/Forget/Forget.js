import React, {useEffect, useState} from 'react';
import './Foget.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import Step from "../../components/RegisterComponents/Step/Step";
import VerifyScreen from "./VerifyScreen/VerifyScreen";
import EmailVerify from "../../components/RegisterComponents/EmailVerify/EmailVerify";
import NewPassword from "./NewPassword/NewPassword";
import {useNavigate, useParams} from "react-router-dom";
import {sendForgetPasswordVerificationCode, sendCodePasswordToServer} from "../../store/actions/forget.password.actions";
import {connect} from "react-redux";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import AuthenticationError from "../../components/AuthenticationError/AuthenticationError";
import {KeepAlive} from "react-activation";
import {changeNavbarAssets} from "../../store/actions/ui.actions";

const Forget = ({sendingCode, changeNavbarAssets, error, errorMessage, sendingCodeToServer, sendCodePasswordToServer, sendForgetPasswordVerificationCode, lan, validation}) => {
    const {t} = useTranslation();
    const [step, setStep] = useState(1);

    const params = useParams();

    useEffect(() => {
        const data = {
            searchPage: false,
            backBtn: true,
            step: null,
            setStep: null,
            search: false,
            midText: t('forget Header'),
            logoLink: '/'
        }
        changeNavbarAssets(data);
    }, []);

    useEffect(() => {
        return () => {
            const data = {
                // assets: assets,
                searchPage: false,
                term: '',
                backBtn: false,
                step: null,
                setStep: null,
                search: true,
                logoLink: '/'
            };
            console.log(data);
            changeNavbarAssets(data);
        }
    }, []);

    const renderForm = () => {
        switch (step) {
            case 1:
                return <EmailVerify
                    form={
                        {
                            email: {
                                value: params.email,
                                type: 'email',
                                rules: {
                                    required: true,
                                    isEmail: true
                                },
                                valid: false,
                                touched: false,
                                name: 'email'
                            }
                        }
                    }
                    forget={true}
                    buttonLink={'/register'}
                    buttonText={'loginregister'}
                    setStep={setStep}
                    step={step}
                    sendCodeFun={sendForgetPasswordVerificationCode}
                    sendingCode={sendingCode}
                    lan={lan}
                    sendingCodeToServer={sendingCodeToServer}
                    sendCodeToServerFun={sendCodePasswordToServer}
                />
            case 2:
                return <NewPassword />
        }
    }

    return (
        <KeepAlive cacheKey={'Forget'}>
            <div className={'Forget'}>
                {/*<Navbar backBtn={true} midText={t('forget Header')} />*/}
                <Step
                    step={step}
                    setStep={setStep}
                    num={2}
                    validation={validation}
                    form={{
                        email: {
                            value: params.email,
                            type: 'email',
                            rules: {
                                required: true,
                                isEmail: true
                            },
                            valid: false,
                            touched: false,
                            name: 'email'
                        }
                    }}
                    type={1}
                    // isValid={isValid}
                />

                <form action="" className={'Forget__form'}>
                    {
                        renderForm()
                    }
                </form>
                {
                    error && (
                        <AuthenticationError errorMessage={errorMessage} />
                    )
                }
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = state => ({
    sendingCode: state.forget.sendingCode,
    lan: state.categories.lan,
    validation: state.forget.validation,
    sendingCodeToServer: state.forget.sendingCodeToServer,
    errorMessage: state.login.errorMessage,
    error: state.login.error
});

export default connect(mapStateToProps, {changeNavbarAssets, sendForgetPasswordVerificationCode, sendCodePasswordToServer}) (Forget);