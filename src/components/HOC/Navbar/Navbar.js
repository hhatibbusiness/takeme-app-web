import React, {useEffect, useRef, useState} from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";
import KeepAlive from "react-activation";
import logo from '../../../assets/images/defaults/logo-default-image.svg';
import Img from "../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../LoadingProduct/LoadingProduct";

// const Navbar = ({assets, setSidebar, searchPage, loadingSearchResults, searchResults, term, backBtn, step, setStep, backUrl, midText, search, focused}) => {
const Navbar = ({data, assets, ui, searching, setSearching, sidebar, setSidebar}) => {
    const [inputFocus, setInputFocus] = useState(false);
    const [backBtn, setBackBtn] = useState(true);
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const imgLoaderRef = useRef(null);

    const navigate = useNavigate();
    useEffect(() => {
        // console.log(assets)
    });

    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div onClick={() => data?.backBtn && navigate('/')} style={{cursor: `${data?.backBtn && 'pointer'}`}} className="Navbar__logo">
                    {/*{assets?.logoPath && <img src={assets?.logoPath && assets.logoPath} alt="logo"/> }*/}
                    {/*<img src={assets?.logoPath} alt=""/>*/}
                    {/*<p>For Your Needs</p>*/}
                    <Img logo={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(assets?.logoPath && assets.logoPath) || logo}/>
                    {/*{(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
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