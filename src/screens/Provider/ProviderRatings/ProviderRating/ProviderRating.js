import React from 'react';
import './ProviderRating.css'
import ProviderRatingProfile from "./ProviderRatingProfile/ProviderRatingProfile";
import ProviderRatings from "../ProviderRatings";
import ProviderRatingScore from "./ProviderRatingScore/ProviderRatingScore";
import ProviderRatingComment from "./ProviderRatingComment/ProviderRatingComment";
import ProviderRatingDate from "./ProviderRatingDate/ProviderRatingDate";
import ProviderRatingDetailedComment from "./ProviderRatingDetailedComment/ProviderRatingDetailedComment";

const ProviderRating = ({rating}) => {
    return (
        <div className={'ProviderRating'}>
            <ProviderRatingProfile rating={rating} />
            <ProviderRatingScore rating={rating} />
            <ProviderRatingComment rating={rating} />
            <ProviderRatingDate rating={rating} />
            <ProviderRatingDetailedComment rating={rating} />
        </div>
    );
};

export default ProviderRating;