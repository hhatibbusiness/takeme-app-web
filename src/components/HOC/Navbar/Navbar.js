import React, {useEffect, useRef, useState} from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";
import {useNavigate} from "react-router-dom";
import logo from '../../../assets/images/defaults/logo-default-image.svg';
import Img from "../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";

const Navbar = ({data, assets, ui, searching, setSearching, sidebar, setSidebar}) => {
    const [inputFocus, setInputFocus] = useState(false);
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);

    const navigate = useNavigate();
    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div onClick={() => data?.backBtn && navigate('/')} style={{cursor: `${data?.backBtn && 'pointer'}`}} className="Navbar__logo">
                    <Img logo={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(assets?.logoPath && assets.logoPath) || logo}/>
                </div>
                {
                    data?.search && <Search searching={searching} setSearching={setSearching} inputFocus={inputFocus} setInputFocus={setInputFocus} loadingSearchResults={data?.loadingSearchResults} searchResults={data?.searchResults} term={data?.term} search={data?.search} searchPage={data?.searchPage} />
                }
                {
                    data?.midText && <Mid midText={data.midText} />
                }
                {
                    ui?.backBtn ? (
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
    ui: state.ui
})

export default connect(mapStateToProps) (Navbar);