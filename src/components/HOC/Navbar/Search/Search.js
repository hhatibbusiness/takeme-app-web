import React from 'react';
import './Search.scss';

const Search = () => {
    return (
        <div className={'Search'}>
            <form className="Search__form">
                <input type="text" className="Search__input" placeholder={'بحث'}/>
                <button className="Search__btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    );
};

export default Search;