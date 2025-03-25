import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Input from "../../../components/InputAdmin/Input";
import TextArea from "../../../components/TextArea/TextArea";
import SaveButton from "../../../components/SaveButton/SaveButton";
import CancelButton from "../../../components/CancelButton/CancelButton";
import PersonalProfilesAddTop from "./PersonalProfilesAddTop/PersonalProfilesAddTop";
import './PersonalProfilesAdd.css';

const PersonalProfilesAdd = ({profiles, admin, setAdmin}) => {
    const [paddingTop, setPaddingTop] = useState(0);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });

    useEffect(() => {
        setAdmin(true);

        return () => {
            setAdmin(false);
        }
    }, []);

    return (
        <div id={'PersonalProfilesAdd'} className={'PersonalProfilesAdd'} style={{paddingTop: `${paddingTop + 20}px`}}>
            <div className='PersonalProfilesAdd__container'>
                <PersonalProfilesAddTop />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    profiles: state.profiles
});

export default connect(mapStateToProps)(PersonalProfilesAdd);