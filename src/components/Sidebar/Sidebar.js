import React, {useEffect, useRef, useState} from 'react';
import './Sidebar.scss';
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {changeLan, changeFilter} from "../../store/actions/categories.action";
import i18next from "i18next";
import {useTranslation} from 'react-i18next';
import {logout} from "../../store/actions/login.action";
import history from "../../history/history";
import {getAnalytics, logEvent} from "firebase/analytics";

const Sidebar = ({assets, setSidebar, sidebar, page, isAuthenticated, logout, changeFilter, filter, lan, changeLan, categories}) => {
    const [langShow, setLanShow] = useState(false);
    const [filterShow, setFilterShow] = useState(false);
    const [socialShow, setSocialShow] = useState(false);
    const [currFilter, setCurrFilter] = useState(filter && filter);
    const whatsappRef = useRef();
    const navigate = useNavigate();

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
        // const languageLabel = e.target.closest('input');
        // const id = categories[0]?.id;
        // if(!languageLabel) return;
        // console.log(languageLabel.value);
        // if(!id) return;
        // changeLan(languageLabel.value, id);
        // i18next.changeLanguage(languageLabel.value);
        const lanFormElement = e.target.closest('.Sidebar__sublinks--element');
        if(!lanFormElement) return alert('There\'s not language');
        console.log(lanFormElement);
        const input = lanFormElement.querySelector('input');
        if(!input) return;
        console.log(input);
        if(input.value == 'en' || input.value == 'he') return;
        const id = categories[0]?.id;
        console.log(id);
        // if(!id) return;
        changeLan(input.value, id);
        i18next.changeLanguage(input.value);
    }

    const filterHandleChange = async e => {
        const filterElement = e.target.closest('.Sidebar__sublinks--element');
        if(!filterElement) return;
        const input = filterElement.querySelector('input');
        if(!input) return;
        const id = categories[0]?.id;
        const containerDiv = document.querySelector('.Products');
        containerDiv.style.height = `${containerDiv.offsetHeight}px`;
        const res = await changeFilter(id, lan, 0, navigate, input.value);
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

    useEffect(() => {

        // window.addEventListener('popstate', e => history.go(1));
        if(sidebar) {
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', e => {
                e.preventDefault();
                setSidebar(false);
            });
        }
    }, [sidebar]);

    return (
        <div className={`Sidebar ${sidebar && 'Sidebar__active'}`}>
            <div className="Sidebar__container">
                <div className="Sidebar__logo">
                    <img src={assets?.logoPath && assets.logoPath} />
                </div>
                <div className="Sidebar__links">
                    <Link onClick={e => setSidebar(false)} to={'/about'} className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <p>{t('who we are')}</p>
                        </div>
                    </Link>
                    <div className="Sidebar__link">
                        <div onClick={() => setLanShow(!langShow)} className="Sidebar__link--main">
                            <i className="fa-solid fa-globe"></i>
                            <p style={{direction: 'rtl'}}>اللغة-השפה</p>
                        </div>
                        <form onClick={lanChangeHandler} className={`Sidebar__sublinks Sidebar__lan--form ${langShow && 'Sidebar__sublinks--active'}`}>
                            <div className="Sidebar__sublinks--element">
                                <input checked={lan == 'ar'} value={'ar'} name={'language'} type="radio"/>
                                <label htmlFor="{'language'}">العربية</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input checked={lan == 'he'} disabled={true} value={'he'} type="radio" name={'language'}/>
                                <label htmlFor="{'language'}">עִברִית</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input checked={lan == 'en'} disabled={true} value={'en'} type="radio" name={'language'}/>
                                <label htmlFor="{'language'}">English</label>
                            </div>
                        </form>
                    </div>
                    <Link to={'#'} className="Sidebar__link">
                        <div onClick={() => setFilterShow(!filterShow)} className="Sidebar__link--main">
                            <i className="fa-regular fa-images"></i>
                            <p>{t('filter')}</p>
                        </div>
                        <form onClick={filterHandleChange} className={`Sidebar__sublinks ${filterShow && 'Sidebar__sublinks--active'}`}>
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
                                <input checked={currFilter === 'SERVICE'} value={'SERVICE'} type="radio" name={'filter'}/>
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
                    {/* <a onClick={async e => {
                        detectWhatsapp('201008549612', 'test').then(has => {
                            alert('You ' + (has? 'have whatsapp' : "don't have whatsapp"));
                        })
                    }} className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-solid fa-handshake"></i>
                            <p>{t('join')}</p>
                        </div>
                    </a> */}
                    <a href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=` : `http://web.whatsapp.com/send?phone=${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=`)} target='_blank' className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-solid fa-handshake"></i>
                            <p>{t('join')}</p>
                        </div>
                    </a>
                    <Link onClick={e => setSidebar(false)} to={'/contract'} className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-regular fa-copyright"></i>
                            <p className={'overflow-hidden text-overflow-ellipsis whitespace-nowrap rtl'}>{t('condition')}</p>
                        </div>
                    </Link>
                    <div className={`Sidebar__link ${socialShow && 'Sidebar__link--active'}`}>
                        <div onClick={() => setSocialShow(!socialShow)} className="Sidebar__link--main">
                            <i className="fa-regular fa-images"></i>
                            <p>{t('contactUs')}</p>
                        </div>
                        <div className={`Sidebar__sublinks ${socialShow && 'Sidebar__sublinks--active'}`}>
                            <a href={assets.facebookLink} target={'_blank'} className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--facebook'}><i className="fa-brands fa-facebook"></i></span>
                                <span>{t("facebook")}</span>
                            </a>
                            <a href={assets.instagramLink} target={'_blank'} className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--instagram'}><i class="fa-brands fa-instagram"></i></span>
                                <span>{t("instagram")}</span>
                            </a>
                            <a href={assets.tiktokLink} target={'_blank'} className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--tiktok'}><i class="fa-brands fa-tiktok"></i></span>
                                <span>{t("tiktok")}</span>
                            </a>
                            <a href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=` : `http://web.whatsapp.com/send?phone=${assets?.phoneCountryCode && assets?.phoneCountryCode}${assets?.phone && assets.phone}&text=`)} target='_blank' className="Sidebar__sublinks--socials-social">
                                <span className={'Sidebar__socials--whatsapp'}><i class="fa-brands fa-whatsapp"></i></span>
                                <span>{t("whatsapp")}</span>
                            </a>
                        </div>
                    </div>
                    {
                        isAuthenticated ? (
                            <p onClick={e => logout()} className="Sidebar__link Sidebar__register Sidebar__logout">{t('logout')}</p>
                        ) : (
                            <Link onClick={e => setSidebar(false)} className={'Sidebar__link Sidebar__register'} to={'/login'}>{t("login")}</Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    lan: state.categories.lan,
    categories: state.categories.categories,
    phoneCode: state.assets.phoneCountryCode,
    phoneNum: state.assets.phone,
    filter: state.categories.filter,
    isAuthenticated: state.login.isAuthenticated,
    page: state.categories.page
});

export default connect(mapStateToProps, {changeLan, changeFilter, logout}) (Sidebar);