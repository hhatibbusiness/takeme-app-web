import React, {useState} from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";
import KeepAlive from "react-activation";

// const Navbar = ({assets, setSidebar, searchPage, loadingSearchResults, searchResults, term, backBtn, step, setStep, backUrl, midText, search, focused}) => {
const Navbar = ({data, assets, sidebar, setSidebar}) => {
    const [inputFocus, setInputFocus] = useState(false);

    const navigate = useNavigate();
    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div onClick={() => data?.backBtn && navigate('/')} style={{cursor: `${data?.backBtn && 'pointer'}`}} className="Navbar__logo">
                    {assets?.logoPath && <img src={assets?.logoPath && assets.logoPath} alt="logo"/> }
                    {/*<p>For Your Needs</p>*/}
                </div>
                {
                    data?.search && <Search inputFocus={inputFocus} setInputFocus={setInputFocus} loadingSearchResults={data?.loadingSearchResults} searchResults={data?.searchResults} term={data?.term} search={data?.search} searchPage={data?.searchPage} />
                }
                {
                    data?.midText && <Mid midText={data.midText} />
                }
                {
                    data?.backBtn ? (
                        <>
                            <BackBtn step={data.step} setStep={data.setStep} />
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
    assets: state.assets,
})

export default connect(mapStateToProps) (Navbar);