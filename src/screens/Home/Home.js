import React, {useEffect, useState} from 'react';
import Intro from "../../components/Intro/Intro";
import Body from "./Body/Body";

const Home = () => {
    const [logoStart, setLogoStart] = useState(true);


    // set 2s for the intro page to show
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setLogoStart(false);
        }, 200000);

        return () => {
            clearTimeout(timeOut);
        }
    }, []);
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

export default Home;