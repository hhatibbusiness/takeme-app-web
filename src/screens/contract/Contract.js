import React, {useEffect} from 'react';
import './Contract.scss';
import {fetchContractPage} from "../../store/actions/contract.actions";
import {connect} from "react-redux";
import Navbar from "../../components/HOC/Navbar/Navbar";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {KeepAlive} from "react-activation";

const Contract = ({fetchContractPage, lan, fetchingContractPage, contractData}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if (contractData) return;
        fetchContractPage(lan, navigate);
    }, [lan]);

    useEffect(() => {
        const home = document.querySelector('body');
        const freezeStyles = () => {
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

    return (
        <KeepAlive cacheKey={'Contract'}>
            <div className={'ContractScreen'}>
                <Navbar backBtn={true} midText={t('condition')} />
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

export default connect(mapStateToProps, {fetchContractPage}) (Contract);