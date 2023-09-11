import React, {useEffect} from 'react';
import './About.scss';
import {fetchAboutPage} from "../../store/actions/about.actions";
import {connect} from "react-redux";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const About = ({fetchAboutPage, fetchingAboutPage, aboutData, lan}) => {
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

    useEffect(() => {
        fetchAboutPage(lan, navigate);
    }, [lan]);


    return (
        <div className={'AboutScreen'}>
            <Navbar backBtn={true} midText={t('who we are')} />

            {
                fetchingAboutPage ? (
                    <SpinnerComponent />
                ) : (
                    <div className={'AboutScreen__content'} dangerouslySetInnerHTML={{__html: aboutData}}/>
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    fetchingAboutPage: state.about.fetchingAboutPage,
    aboutData: state.about.data,
    lan: state.categories.lan
})

export default connect(mapStateToProps, {fetchAboutPage}) (About);