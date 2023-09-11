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

const Forget = ({sendingCode, sendingCodeToServer, sendCodePasswordToServer, sendForgetPasswordVerificationCode, lan, validation}) => {
    const [step, setStep] = useState(1);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordActive, setNewPasswordActive] = useState(false)
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [confirmNewPasswordActive, setConfirmNewPasswordActive] = useState(false);
    const {t} = useTranslation();
    const params = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(!params.email) {
    //         navigate('/login');
    //     } else {
    //         sendForgetPasswordVerificationCode(params.email, navigate);
    //     }
    // }, []);

    useEffect(() => {
        const home = document.querySelector('body');

        const freezeStyles = () => {
            // home && (home.style.height = '100vh')
            home.classList.add('Home__hide')
        }
        const releaseStyles = () => {
            home.classList.remove('Home__hide')
        }

        freezeStyles();

        return () => {
            releaseStyles();
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
        <div className={'Forget'}>
            <Navbar backBtn={true} midText={t('forget Header')} />
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
        </div>
    );
};

const mapStateToProps = state => ({
    sendingCode: state.forget.sendingCode,
    lan: state.categories.lan,
    validation: state.forget.validation,
    sendingCodeToServer: state.forget.sendingCodeToServer
    // code: state.forget.code
})

export default connect(mapStateToProps, {sendForgetPasswordVerificationCode, sendCodePasswordToServer}) (Forget);