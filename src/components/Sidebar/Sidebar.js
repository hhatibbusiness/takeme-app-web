import React, {useEffect, useRef, useState} from 'react';
import './Sidebar.scss';
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {changeLan, changeFilter, changeCurrentSelectedLocale} from "../../store/actions/categories.action";
import i18next from "i18next";
import {useTranslation} from 'react-i18next';
import {logout} from "../../store/actions/login.action";
import history from "../../history/history";
import {getAnalytics, logEvent} from "firebase/analytics";
import enter from '../../assets/images/enter.png';
import navigateImg from '../../assets/images/navigate.png';
import conditions from '../../assets/images/conditions.png';
import join from '../../assets/images/join.png';
import filterImg from '../../assets/images/filter.png';
import language from '../../assets/images/language.png';
import localesImage from '../../assets/images/locales.png';
import countries from '../../assets/images/countries.png';
import aboutImg from '../../assets/images/about.png';
import outImg from '../../assets/images/out.png';
import deleteImg from '../../assets/images/delete.png';

import Img from "../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import logo from "../../assets/images/defaults/logo-default-image.svg";
import ProviderPreview from "./ProviderPreview/ProviderPreview";
import Install from "../HOC/NavbarWebsite/Install/Install";
import {logUserOut} from "../../store/actions/auth.actions";

import WarningAlarm from '../WarningAlarm/WarningAlarmPop'
import { DeleteProfile } from '../../screens/ProfilePage/models/manageProfile'

const Sidebar = ({assets, backBtn, logUserOut, profile, roles, setSidebar, changeCurrentSelectedLocale, store, user, locales, selectedLocale, takemeProviderData, sidebar, isAuthenticated, logout, changeFilter, filter, lan, changeLan, categories}) => {
    const [langShow, setLanShow] = useState(false);
    const [filterShow, setFilterShow] = useState(false);
    const [socialShow, setSocialShow] = useState(false);
    const [currFilter, setCurrFilter] = useState(filter && filter);
    const whatsappRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [ openWarning, setOpenWarning ] = useState(false)

    const {t} = useTranslation();

    useEffect(() => {
        setCurrFilter(filter);
    }, [filter]);

    const filterChangeHandler = e => {
        const filter = e.target.closest('input');
        if (!filter) return;
        filter.checked = true;
        i18next.changeLanguage(lan);
    }

    const detectWhatsapp = (phone, text) => {
        var f = Date.now(),
        j = setTimeout(function() {
        if (Date.now() - f > 1250)
            return;
        alert('WA not installed')
        }, 1e3);
    };

    const lanChangeHandler = e => {
        const lanFormElement = e.target.closest('.Sidebar__sublinks--element');
        if(!lanFormElement) return alert('There\'s not language');
        const input = lanFormElement.querySelector('input');
        if(!input) return;
        if(input.value == 'en' || input.value == 'he') return;
        const id = categories[0]?.id;
        changeLan(input.value, id);
        i18next.changeLanguage(input.value);
    }

    const filterHandleChange = async e => {
        const filterElement = e.target.closest('.Sidebar__sublinks--element');
        if(!filterElement) return;
        const input = filterElement.querySelector('input');
        if(!input) return;
        const id = categories[0]?.id;
        const containerDiv = !store ? document.querySelector('.Items') : document.querySelector('.Store');
        containerDiv.style.height = `${containerDiv.offsetHeight}px`;
        const res = await changeFilter(id, lan, 0, navigate, input.value, store);
        containerDiv.style.height = 'auto';
    }

    useEffect(() => {
        whatsappRef.current && whatsappRef.current.addEventListener('click', function() {
            var f = Date.now(),
              j = setTimeout(function() {
                if (Date.now() - f > 1250)
                  return;
                alert('WA not installed')
              }, 1e3);
          })
    }, []);

    //useEffect(() => {
    //    console.log(roles);
    //});

    // useEffect(() => {

    //     // window.addEventListener('popstate', e => history.go(1));
    //     if(sidebar) {
    //         window.history.pushState(null, null, window.location.href);
    //         window.addEventListener('popstate', e => {
    //             e.preventDefault();
    //             setSidebar(false);
    //         });
    //     }
    // }, [sidebar]);

    return (
        <>
        <div id={'Sidebar'} style={{zIndex: `${backBtn ? 0 : 5000}`}} className={`Sidebar ${sidebar && 'Sidebar__active'}`}>
            <div id={'Sidebar__container'} className="Sidebar__container">

                <div id={'Sidebar__logo'} className="Sidebar__logo">
                    {/*<img src={assets?.logoPath && assets.logoPath} />*/}
                    <Img logo={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(assets?.logoPath && assets.logoPath) || logo}/>

                </div>
                {
                    profile && roles?.includes('ROLE_Admin') && (
                        <ProviderPreview setSidebar={setSidebar} provider={takemeProviderData} />
                    )
                }
                <div id={'Sidebar__links'} className="Sidebar__links">
                    <div id={'Sidebar__language'} className="Sidebar__link">
                        <div onClick={() => setLanShow(!langShow)} className="Sidebar__link--main">
                            {/*<i className="fa-solid fa-globe"></i>*/}
                            <img src={language}/>
                            <p style={{direction: 'rtl'}}>اللغة-השפה</p>
                        </div>
                        <form
                            className={`Sidebar__sublinks Sidebar__lan--form ${langShow && 'Sidebar__sublinks--active'}`}>
                            {/* <div className="Sidebar__sublinks--element">
                                <input checked={lan == 'ar'} value={'ar'} name={'language'} type="radio"/>
                                <label htmlFor="{'language'}">العربية</label>
                            </div> */}
                            {
                                locales?.map((locale) => (
                                    <div onClick={e => {
                                        changeCurrentSelectedLocale(locale);
                                    }} className="Sidebar__sublinks--element">
                                        <input checked={selectedLocale?.locale == locale?.locale} value={locale?.locale}
                                               type="radio" name={'language'}/>
                                        <label htmlFor="{'language'}">{locale?.name}</label>
                                    </div>
                                ))
                            }
                            <div className="Sidebar__sublinks--element">
                                <input checked={lan == 'he'} disabled={true} value={'he'} type="radio"
                                       name={'language'}/>
                                <label htmlFor="{'language'}">עִברִית</label><span
                                style={{fontSize: '13px', color: "var(--main-color-green-dark-1)"}}> (בקרוב)</span>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input checked={lan == 'en'} disabled={true} value={'en'} type="radio"
                                       name={'language'}/>
                                <label htmlFor="{'language'}">English <span style={{
                                    fontSize: '13px',
                                    color: "var(--main-color-green-dark-1)"
                                }}>(coming soon)</span></label>
                            </div>
                        </form>
                    </div>
                    <Link id={'Sidebar__about'}  to={'/about'}
                          className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            {/*<i className="fa-solid fa-circle-exclamation"></i>*/}
                            <img src={aboutImg}/>
                            <p>{t('who we are')}</p>
                        </div>
                    </Link>
                    <Link id={'Sidebar__conditions'}  to={'/contract'}
                          className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <img src={conditions}/>
                            {/*<i className="fa-regular fa-copyright"></i>*/}
                            <p className={'overflow-hidden text-overflow-ellipsis whitespace-nowrap rtl'}>{t('condition')}</p>
                        </div>
                    </Link>
                    <a id={'Sidebar__join'}
                       href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=` : `http://web.whatsapp.com/send?phone=${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=`)}
                       target='_blank' className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <img src={join}/>
                            {/*<i className="fa-solid fa-handshake"></i>*/}
                            <p>{t('join')}</p>
                        </div>
                    </a>

                    <div id={'Sidebar__contact'} className={`Sidebar__link ${socialShow && 'Sidebar__link--active'}`}>
                        <div onClick={() => setSocialShow(!socialShow)} className="Sidebar__link--main">
                            {/*<i className="fa-regular fa-images"></i>*/}
                            <img src={navigateImg}/>
                            <p>{t('contactUs')}</p>
                        </div>
                        <div className={`Sidebar__sublinks ${socialShow && 'Sidebar__sublinks--active'}`}>
                            <a href={assets.facebookLink} target={'_blank'}
                               className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--facebook'}><i className="fa-brands fa-facebook"></i></span>
                                <span>{t("facebook")}</span>
                            </a>
                            <a href={assets.instagramLink} target={'_blank'}
                               className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--instagram'}><i
                                    className="fa-brands fa-instagram"></i></span>
                                <span>{t("instagram")}</span>
                            </a>
                            <a href={assets.tiktokLink} target={'_blank'} className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--tiktok'}><i
                                    className="fa-brands fa-tiktok"></i></span>
                                <span>{t("tiktok")}</span>
                            </a>
                            <a href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=` : `http://web.whatsapp.com/send?phone=${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=`)}
                               target='_blank' className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--whatsapp'}><i className="fa-brands fa-whatsapp"></i></span>
                                <span>{t("whatsapp")}</span>
                            </a>
                        </div>
                    </div>
                    {
                        roles?.includes('ROLE_Admin') && (
                            <>
                                <Link id={'Sidebar__conditions'} to={'/languages'}
                                      className="Sidebar__link">
                                    <div className="Sidebar__link--main">
                                        <img src={language}/>
                                        {/*<i className="fa-regular fa-copyright"></i>*/}
                                        <p className={'overflow-hidden text-overflow-ellipsis whitespace-nowrap rtl'}>{t('languages')}</p>
                                    </div>
                                </Link>
                                <Link id={'Sidebar__conditions'} to={'/locales'}
                                      className="Sidebar__link">
                                    <div className="Sidebar__link--main">
                                        <img src={localesImage}/>
                                        {/*<i className="fa-regular fa-copyright"></i>*/}
                                        <p className={'overflow-hidden text-overflow-ellipsis whitespace-nowrap rtl'}>{t('locales')}</p>
                                    </div>
                                </Link>
                                <Link id={'Sidebar__conditions'} to={'/countries'}
                                      className="Sidebar__link">
                                    <div className="Sidebar__link--main">
                                        <img src={countries}/>
                                        {/*<i className="fa-regular fa-copyright"></i>*/}
                                        <p className={'overflow-hidden text-overflow-ellipsis whitespace-nowrap rtl'}>{t('countries')}</p>
                                    </div>
                                </Link>
                            </>
                        )
                    }

                    <Install/>
                    <Link id={'Sidebar__filter'} to={'#'} className="Sidebar__link">
                        <div onClick={() => setFilterShow(!filterShow)} className="Sidebar__link--main">
                            {/*<i className="fa-regular fa-images"></i>*/}
                            <img src={filterImg}/>
                            <p>{t('filter')}</p>
                        </div>
                        <form onClick={filterHandleChange}
                              className={`Sidebar__sublinks ${filterShow && 'Sidebar__sublinks--active'}`}>
                            {/*{*/}
                            {/*    t("filter array", {returnObjects: true}).map(f => (*/}
                            {/*        <div className="Sidebar__sublinks--element">*/}
                            {/*            <input name={'filter'} type="radio"/>*/}
                            {/*            <label htmlFor="{'filter'}">{f}</label>*/}
                            {/*        </div>*/}
                            {/*    ))*/}
                            {/*}*/}
                            <div className="Sidebar__sublinks--element">
                                <input checked={currFilter === 'NONE'} value={'NONE'} type="radio" name={'filter'}/>
                                <label htmlFor="{'filter'}">{t('filter array', {returnObjects: true})[0]}</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input checked={currFilter === 'SERVICE'} value={'SERVICE'} type="radio"
                                       name={'filter'}/>
                                <label htmlFor="{'filter'}">{t('filter array', {returnObjects: true})[1]}</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input checked={currFilter === 'RENT'} value={'RENT'} type="radio" name={'filter'}/>
                                <label htmlFor="{'filter'}">{t('filter array', {returnObjects: true})[2]}</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input checked={currFilter === 'SALE'} value={'SALE'} type="radio" name={'filter'}/>
                                <label htmlFor="{'filter'}">{t('filter array', {returnObjects: true})[3]}</label>
                            </div>
                        </form>
                    </Link>
                    {
                        (isAuthenticated) ? (
                            <>
                            <p id={'Sidebar__logout'} 
                                onClick={e => {
                                    logUserOut();
                                    setSidebar(false);
                                    navigate('/')}
                                }
                                className="Sidebar__link Sidebar__register Sidebar__logout">
                                <img src={outImg}/>
                                {t('logout')}
                            </p>
                            {/** Delete the Profile Data */}
                            <div id={'Sidebar__deleteProfile'} 
                                onClick={e => { 
                                    //setSidebar(false)
                                    setOpenWarning(true)
                                }}
                                className="Sidebar__link Sidebar__register Sidebar__logout">
                                <img src={deleteImg}/>
                                {"حذف البروفايل"}
                            </div>
                            </>

                        ) : (
                            <Link id={'Sidebar__login'}
                                  className={'Sidebar__link Sidebar__register'} to={'/login'}>
                                <div className={'Sidebar__link--main'}>
                                    <img src={enter}/>
                                    <span className={'Sidebar__register--container'}>
                                        {t("login")}
                                        <span className={'Sidebar__partners'}>({t("forparteners")})</span>
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
        {isAuthenticated && openWarning &&
            <WarningAlarm
                CloseFun={()=> setOpenWarning(false)}
                SaveFun={async () => {
                    console.log("delete data...");
                    await DeleteProfile({mLocale: 'ar_SA', userId: profile.id});
                    logUserOut();
                    console.log("Data Deleted!");
                    setSidebar(false);
                    navigate('/');
                    setOpenWarning(false)
                }}
                typeSrc={'alarm'}
                message={"do you want"}
            />
        }
        </>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    lan: state.categories.lan,
    categories: state.categories.categories,
    phoneCode: state.assets.phoneCountryCode,
    phoneNum: state.assets.phone,
    filter: state.categories.filter,
    isAuthenticated: state.auth.isAuthenticated,
    page: state.categories.page,
    user: state.login.data,
    takemeProviderData: state.login.takemeProviderData,
    takemeProviderToken: state.login.takemeProviderToken,
    store: state.categories.store,
    locales: state.categories.locales,
    selectedLocale: state.categories.selectedLocale,
    roles: state.auth.roles,
    profile: state.auth.profile
});

export default connect(mapStateToProps, {
    changeLan,
    logUserOut,
    changeCurrentSelectedLocale,
    changeFilter,
    logout
})(Sidebar);