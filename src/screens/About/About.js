import React, {useEffect} from 'react';
import './About.scss';
import {fetchAboutPage} from "../../store/actions/about.actions";
import {connect} from "react-redux";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {KeepAlive} from "react-activation";
import {changeNavbarAssets} from "../../store/actions/ui.actions";

const About = ({fetchAboutPage, changeNavbarAssets, fetchingAboutPage, aboutData, lan}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

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

    const params = useParams();

    useEffect(() => {
        if(aboutData) return;
        fetchAboutPage(lan, navigate);
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
            midText: t('who we are'),
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
        <KeepAlive cacheKey={'About'}>
            <div id={'AboutScreen'} className={'AboutScreen'}>
                {/*<Navbar backBtn={true} midText={t('who we are')} />*/}
                {
                    fetchingAboutPage ? (
                        <SpinnerComponent />
                    ) : (
                        <div className={'AboutScreen__content'} dangerouslySetInnerHTML={{__html: aboutData}}/>
                    )
                }
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = state => ({
    fetchingAboutPage: state.about.fetchingAboutPage,
    aboutData: state.about.data,
    lan: state.categories.lan
})

export default connect(mapStateToProps, {fetchAboutPage, changeNavbarAssets}) (About);