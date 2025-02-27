import React, {useEffect, useRef, useState} from 'react';
import './NavbarTop.css';
import Img from "../../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import logo from "../../../../assets/images/defaults/logo-default-image.svg";
import Search from "../Search/Search";
import Mid from "../Mid/Mid";
import BackBtn from "../BackBtn/BackBtn";
import Burger from "../Burger/Burger";
import {useLocation, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {changeMidTextShowState} from "../../../../store/actions/navbar.actions";

const NavbarTop = ({
   showMidText, // DONE IN THE NAVBAR REDUX STATE
   personActive,
   filtersActive,
   setSidebar,
   assets,
   backBtn,
   data,
   middleContent,
   midText,
   setSeparatorActive,
   setEyeOpen,
   viewOpen,
   setViewOpen
}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [inputFocus, setInputFocus] = useState(false);

    const imgRefDub = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(viewOpen || filtersActive || personActive) {
            setSeparatorActive(true);
        } else {
            setSeparatorActive(false);
        }
    }, [viewOpen, filtersActive, personActive]);

    useEffect(() => {
        if(location.pathname.split('/').filter(item => item).length == 0) {
            setEyeOpen(true);
        }else {
            setViewOpen(false);
            setEyeOpen(false);
        }
    }, [location]);

    return (
        <div className={'NavbarTop'}>
            <div className={'Navbar__container'}>
                <div onClick={() => navigate('/')} style={{cursor: `${data?.backBtn && 'pointer'}`}} className="Navbar__logo">
                    <div className="NavbarWebsite__overlay"></div>
                    <div className="Navbar__logo-background">
                        <Img
                            logo={true} setError={setError}
                            hidden={hidden}
                            setHidden={setHidden}
                            setLoaded={setLoaded}
                            imgRefDub={imgRefDub}
                            setContainerLoaded={setContainerLoaded}
                            setImgLoaded={setImgLoaded}
                            imgUrl={(assets?.logoPath && assets.logoPath) || logo}
                        />
                    </div>
                </div>

                {
                    middleContent
                }

                {
                    showMidText && <Mid midText={midText}/>
                }
                <div className={'Navbar__left--container'}>
                    {
                        backBtn ? (
                            <>
                                <BackBtn step={data?.step} setStep={data?.setStep}/>
                            </>
                        ) : (
                            <>
                                <Burger setSidebar={setSidebar}/>
                            </>
                        )
                    }
                    {/*<Install />*/}
                </div>
                {
                    viewOpen && <div onClick={e => setViewOpen(false)} className={'Navbar__view--backdrop'}></div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    showMidText: state.navbar.showMidText,
    middleContent: state.navbar.middleContent,
    midText: state.navbar.midText,
    backBtn: state.navbar.backBtn,
});

export default connect(mapStateToProps, {}) (NavbarTop);