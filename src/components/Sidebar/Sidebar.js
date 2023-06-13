import React, {useEffect, useState} from 'react';
import './Sidebar.scss';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {changeLan} from "../../store/actions/categories.action";
import i18next from "i18next";
import {useTranslation} from 'react-i18next';

const Sidebar = ({assets, sidebar, setSidebar, lan, changeLan, categories}) => {
    const [langShow, setLanShow] = useState(false);
    const [filterShow, setFilterShow] = useState(false);
    const [filter, setFilter] = useState('all');

    const {t} = useTranslation();

    const filterChangeHandler = e => {
        const filter = e.target.closest('input');
        console.log(filter);
        if (!filter) return;
        console.log(filter.checked);
        filter.checked = true;
        i18next.changeLanguage(lan);
    }

    const lanChangeHandler = e => {
        const languageLabel = e.target.closest('input');
        const id = categories[0].id;
        if(!languageLabel) return;
        console.log(languageLabel.value);
        if(!id) return;
        changeLan(languageLabel.value, id);
        i18next.changeLanguage(languageLabel.value);
    }

    useEffect(() => {
        console.log(t("filter array", {returnObjects: true}))
    })


    return (
        <div className={`Sidebar ${sidebar && 'Sidebar__active'}`}>
            <div className="Sidebar__container">
                <div className="Sidebar__logo">
                    <img src={assets.logoPath} />
                </div>
                <div className="Sidebar__links">
                    <Link to={'#'} className="Sidebar__link">
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
                        <form onChange={lanChangeHandler} className={`Sidebar__sublinks ${langShow && 'Sidebar__sublinks--active'}`}>
                            <div className="Sidebar__sublinks--element">
                                <input checked={lan === 'ar'} value={'ar'} name={'language'} type="radio"/>
                                <label htmlFor="{'language'}">العربية</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input checked={lan === 'he'} value={'he'} type="radio" name={'language'}/>
                                <label htmlFor="{'language'}">עִברִית</label>
                            </div>
                        </form>
                    </div>
                    <Link to={'#'} className="Sidebar__link">
                        <div onClick={() => setFilterShow(!filterShow)} className="Sidebar__link--main">
                            <i className="fa-regular fa-images"></i>
                            <p>{t('filter')}</p>
                        </div>
                        <form className={`Sidebar__sublinks ${filterShow && 'Sidebar__sublinks--active'}`}>
                            {
                                t("filter array", {returnObjects: true}).map(f => (
                                    <div className="Sidebar__sublinks--element">
                                        <input name={'filter'} type="radio"/>
                                        <label htmlFor="{'filter'}">{f}</label>
                                    </div>

                                ))
                            }
                            {/*<div className="Sidebar__sublinks--element">*/}
                            {/*    <input type="radio" name={'filter'}/>*/}
                            {/*    <label htmlFor="{'filter'}">عرض الخدمات</label>*/}
                            {/*</div>*/}
                            {/*<div className="Sidebar__sublinks--element">*/}
                            {/*    <input type="radio" name={'filter'}/>*/}
                            {/*    <label htmlFor="{'filter'}">عرض منتجات الاستئجار</label>*/}
                            {/*</div>*/}
                            {/*<div className="Sidebar__sublinks--element">*/}
                            {/*    <input type="radio" name={'filter'}/>*/}
                            {/*    <label htmlFor="{'filter'}">عرض منتجات البيع</label>*/}
                            {/*</div>*/}
                        </form>
                    </Link>
                    <Link to={'#'} className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-solid fa-handshake"></i>
                            <p>{t('join')}</p>
                        </div>
                    </Link>
                    <Link to={'#'} className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-regular fa-copyright"></i>
                            <p>{t('condition')}</p>
                        </div>
                    </Link>
                    <Link className={'Sidebar__link Sidebar__register'} to={'#'}>{t("login")}</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    lan: state.categories.lan,
    categories: state.categories.categories,
});

export default connect(mapStateToProps, {changeLan}) (Sidebar);