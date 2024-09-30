import React from 'react';
import './SearchShimmer.css';

const SearchShimmer = ({ topValue }) => {
    return (
        <div style={{paddingTop: `${topValue}px`}} className={'SearchShimmer'}>
            <div className="SearchShimmer__container">
                <div className="SearchShimmer__images">
                    <div className="SearchShimmer__images--prod"></div>
                    <div className="SearchShimmer__images--avatar"></div>
                </div>
                <div className="SearchShimmer__details">
                    <div className="SearchShimmer__details--name"></div>
                    <div className="SearchShimmer__details--prices"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    {/*<div className="SearchShimmer__details--desc"></div>*/}
                </div>
            </div>
            <div className="SearchShimmer__container">
                <div className="SearchShimmer__images">
                    <div className="SearchShimmer__images--prod"></div>
                    <div className="SearchShimmer__images--avatar"></div>
                </div>
                <div className="SearchShimmer__details">
                    <div className="SearchShimmer__details--name"></div>
                    <div className="SearchShimmer__details--prices"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    {/*<div className="SearchShimmer__details--desc"></div>*/}
                </div>
            </div>
            <div className="SearchShimmer__container">
                <div className="SearchShimmer__images">
                    <div className="SearchShimmer__images--prod"></div>
                    <div className="SearchShimmer__images--avatar"></div>
                </div>
                <div className="SearchShimmer__details">
                    <div className="SearchShimmer__details--name"></div>
                    <div className="SearchShimmer__details--prices"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    {/*<div className="SearchShimmer__details--desc"></div>*/}
                </div>
            </div>
            <div className="SearchShimmer__container">
                <div className="SearchShimmer__images">
                    <div className="SearchShimmer__images--prod"></div>
                    <div className="SearchShimmer__images--avatar"></div>
                </div>
                <div className="SearchShimmer__details">
                    <div className="SearchShimmer__details--name"></div>
                    <div className="SearchShimmer__details--prices"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    <div className="SearchShimmer__details--desc"></div>
                    {/*<div className="SearchShimmer__details--desc"></div>*/}
                </div>
            </div>
        </div>
    );
};

export default SearchShimmer;