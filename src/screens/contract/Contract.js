import React, {useEffect} from 'react';
import './Contract.scss';
import {fetchContractPage} from "../../store/actions/contract.actions";
import {connect} from "react-redux";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {KeepAlive} from "react-activation";
import {changeNavbarAssets} from "../../store/actions/ui.actions";
import ReactHtmlParser from "react-html-parser";
import DOMPurify from "dompurify";
import {changeMidTextShowState, changeBackBtnState} from "../../store/actions/navbar.actions";

const Contract = ({changeBackBtnState, fetchContractPage, changeMidTextShowState, setBackBtn, setShowIcons, changeNavbarAssets, lan, fetchingContractPage, contractData}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        changeBackBtnState(true);
        setShowIcons(false);
        const midData = {
            state: true,
            midText: t('condition'),
        }
        changeMidTextShowState(midData);

        return () => {
            changeBackBtnState(false);
            setShowIcons(true);

            const midData = {
                state: false,
                midText: null

            }
            changeMidTextShowState(midData);
        }
    }, []);


    useEffect(() => {
        if (contractData) return;
        fetchContractPage(lan, navigate);
    }, [lan]);

    useEffect(() => {
        const home = document.querySelector('body');
        const navbar = document.querySelector('.Navbar__container')
        const freezeStyles = () => {
            home.classList.add('Home__hide');
            navbar.classList.add('Home__direction');

        }
        const releaseStyles = () => {
            home.classList.remove('Home__hide');
            navbar.classList.add('Home__direction');

        }

        freezeStyles();

        return () => {
            releaseStyles();
        }
    }, []);

    useEffect(() => {
        const another = {
            searchPage: false,
            backBtn: true,
            step: null,
            setStep: null,
            search: false,
            midText: t('condition'),
            logoLink: '/'
        };
        changeNavbarAssets(another);
    }, []);

    useEffect(() => {
        const contractContainer = document.querySelector('.ContractScreen__content');
        if(contractContainer) {
            contractContainer.classList.add('ContractScreen__addedClass');
            setTimeout(() => {
                contractContainer.style.display = "block";
            }, 150);
        }

    }, [fetchingContractPage]);

    return (
        <KeepAlive cacheKey={'Contract'}>
            <div className={'ContractScreen'}>
                {
                    fetchingContractPage ? (
                        <SpinnerComponent />
                    ) : (
                        <div className={'ContractScreen__content'}>{ReactHtmlParser(DOMPurify.sanitize(contractData))}</div>
                    )
                }
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    contractData: state.contract.data,
    fetchingContractPage: state.contract.fetchingContract
})

export default connect(mapStateToProps, {changeBackBtnState, changeMidTextShowState, changeNavbarAssets, fetchContractPage}) (Contract);