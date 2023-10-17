import React, {useEffect} from 'react';
import './ProviderRatigs.css';
import Navbar from "../../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {fetchProviderRatigs} from "../../../store/actions/ratings.actions";
import {connect} from "react-redux";
import SpinnerComponent from "../../../components/Spinner/Spinner.Component";
import ProviderRating from "./ProviderRating/ProviderRating";

const ProviderRatings = ({fetchProviderRatigs, fetchingRatings, ratings}) => {

    useEffect(() => {
        fetchProviderRatigs();
    }, []);

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

    const {t} = useTranslation();

    return (
        <div className={'ProviderRatings'}>
            <Navbar backBtn={true} midText={t('ratings')} />
            <div className="ProviderRatings__container">
                {
                    fetchingRatings ? (
                        <SpinnerComponent />
                    ) : (
                        ratings.length > 0 && ratings.map((r, i) => (
                            <ProviderRating rating={r} key={r.ratingId} />
                        ))
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    ratings: state.ratings.ratings,
    fetchingRatings: state.ratings.fetchingRatings
});

export default connect(mapStateToProps, {fetchProviderRatigs}) (ProviderRatings);