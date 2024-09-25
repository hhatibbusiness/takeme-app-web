import React from 'react';
import './ProviderRatigs.css';
import {useTranslation} from "react-i18next";
import {fetchProviderRatigs} from "../../../store/actions/ratings.actions";
import {connect} from "react-redux";
import SpinnerComponent from "../../../components/Spinner/Spinner.Component";
import ProviderRating from "./ProviderRating/ProviderRating";

const ProviderRatings = ({fetchingRatings, ratings}) => {

    const {t} = useTranslation();

    return (
        <div className={'ProviderRatings'}>
            <div className="ProviderRatings__container">
                <div className="ProviderRatings__header">
                    <h3>{t("providerratings")}</h3>
                </div>
                {
                    fetchingRatings ? (
                        <SpinnerComponent />
                    ) : (
                        ratings.length > 0 && ratings.map((r) => (
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

export default connect(mapStateToProps, {fetchProviderRatigs}) (React.memo(ProviderRatings));