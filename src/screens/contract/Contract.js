import React, {useEffect} from 'react';
import './Contract.scss';
import {fetchContractPage} from "../../store/actions/contract.actions";
import {connect} from "react-redux";
import Navbar from "../../components/HOC/Navbar/Navbar";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {KeepAlive} from "react-activation";
import {changeNavbarAssets} from "../../store/actions/ui.actions";

const Contract = ({fetchContractPage, changeNavbarAssets, lan, fetchingContractPage, contractData}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

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
        const data = {
            searchPage: false,
            backBtn: true,
            step: null,
            setStep: null,
            search: false,
            midText: t('condition'),
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

    return (
        <KeepAlive cacheKey={'Contract'}>
            <div className={'ContractScreen'}>
                {/*<Navbar backBtn={true} midText={t('condition')} />*/}
                {
                    fetchingContractPage ? (
                        <SpinnerComponent />
                    ) : (
                        <div className={'ContractScreen__content'} dangerouslySetInnerHTML={{__html: contractData && contractData}}/>
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

export default connect(mapStateToProps, {changeNavbarAssets, fetchContractPage}) (Contract);