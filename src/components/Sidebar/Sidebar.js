import React, {useState} from 'react';
import './Sidebar.scss';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Sidebar = ({assets, sidebar, setSidebar}) => {
    const [langShow, setLanShow] = useState(false);
    const [filterShow, setFilterShow] = useState(false);
    const [lang, setLang] = useState('ar');
    const [filter, setFilter] = useState('all');

    const filterChangeHandler = e => {
        const filter = e.target.closest('input');
        console.log(filter);
        if (!filter) return;
        console.log(filter.checked);
        filter.checked = true;
    }
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
                            <p>من نحن؟</p>
                        </div>
                    </Link>
                    <div className="Sidebar__link">
                        <div onClick={() => setLanShow(!langShow)} className="Sidebar__link--main">
                            <i className="fa-solid fa-globe"></i>
                            <p style={{direction: 'rtl'}}>اللغة-English</p>
                        </div>
                        <form  className={`Sidebar__sublinks ${langShow && 'Sidebar__sublinks--active'}`}>
                            <div className="Sidebar__sublinks--element">
                                <input name={'language'} type="radio"/>
                                <label htmlFor="{'language'}">العربية</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input type="radio" name={'language'}/>
                                <label htmlFor="{'language'}">English</label>
                            </div>
                        </form>
                    </div>
                    <Link to={'#'} className="Sidebar__link">
                        <div onClick={() => setFilterShow(!filterShow)} className="Sidebar__link--main">
                            <i className="fa-regular fa-images"></i>
                            <p>فلتر</p>
                        </div>
                        <form className={`Sidebar__sublinks ${filterShow && 'Sidebar__sublinks--active'}`}>
                            <div className="Sidebar__sublinks--element">
                                <input name={'filter'} type="radio"/>
                                <label htmlFor="{'filter'}">عرض الكل</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input type="radio" name={'filter'}/>
                                <label htmlFor="{'filter'}">عرض الخدمات</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input type="radio" name={'filter'}/>
                                <label htmlFor="{'filter'}">عرض منتجات الاستئجار</label>
                            </div>
                            <div className="Sidebar__sublinks--element">
                                <input type="radio" name={'filter'}/>
                                <label htmlFor="{'filter'}">عرض منتجات البيع</label>
                            </div>
                        </form>
                    </Link>
                    <Link to={'#'} className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-solid fa-handshake"></i>
                            <p>انضم كصاحب منتج أو خدمة</p>
                        </div>
                    </Link>
                    <Link to={'#'} className="Sidebar__link">
                        <div className="Sidebar__link--main">
                            <i className="fa-regular fa-copyright"></i>
                            <p>العقد و شروط الاستخدام</p>
                        </div>
                    </Link>
                    <Link className={'Sidebar__link Sidebar__register'} to={'#'}>تسجيل الدخول</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Sidebar);