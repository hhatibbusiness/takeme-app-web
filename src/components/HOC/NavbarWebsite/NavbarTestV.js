import React from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";
import SearchTestV from "./Search/SearchTestV";

const Navbar = ({assets, setSidebar, backBtn, step, setStep, backUrl, midText, search, focused}) => {
    const navigate = useNavigate();
    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div onClick={() => backBtn && navigate('/')} style={{cursor: `${backBtn && 'pointer'}`}} className="Navbar__logo">
                    <img src={assets?.logoPath && assets.logoPath} alt="logo"/>
                    {/*<p>For Your Needs</p>*/}
                </div>
                {
                    search && <SearchTestV />
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

export default Navbar;

// export default connect(mapStateToProps) (Navbar);