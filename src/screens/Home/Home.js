import React, {useEffect, useState} from 'react';
import Intro from "../../components/Intro/Intro";
import Body from "./Body/Body";
import {connect} from "react-redux";
import {fetchCategories} from '../../store/actions/categories.action';
import './Home.scss';
const Home = ({lan, fetchCategories, filter}) => {
    const [logoStart, setLogoStart] = useState(true);

    // set 2s for the intro page to show
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setLogoStart(false);
        }, 2000);

        return () => {
            clearTimeout(timeOut);
        }
    }, []);

    useEffect(() => {
        fetchCategories(lan, filter);
    }, [filter]);

    return (
        <div className={'Home'}>
            {
                logoStart ? (
                    <Intro />
                ) : (
                    <Body />
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    filter: state.categories.filter
})

export default connect(mapStateToProps, {fetchCategories}) (Home);