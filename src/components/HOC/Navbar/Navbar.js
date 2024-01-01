import React from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";

const Navbar = ({assets, setSidebar, searchPage, loadingSearchResults, searchResults, term, backBtn, step, setStep, backUrl, midText, search, focused}) => {
    const navigate = useNavigate();
    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div onClick={() => backBtn && navigate('/')} style={{cursor: `${backBtn && 'pointer'}`}} className="Navbar__logo">
                    <img src={assets?.logoPath && assets.logoPath} alt="logo"/>
                    {/*<p>For Your Needs</p>*/}
                </div>
                {
                    search && <Search loadingSearchResults={loadingSearchResults} searchResults={searchResults} term={term} search={search} searchPage={searchPage} />
                }
                {
                    midText && <Mid midText={midText} />
                }
                {
                    backBtn ? (
                        <>
                            <BackBtn step={step} setStep={setStep} />
                        </>
                    ) : (
                        <>
                            <Burger setSidebar={setSidebar} />
                        </>
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Navbar);