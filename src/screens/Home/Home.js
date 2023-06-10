import React, {useEffect, useState} from 'react';
import Intro from "../../components/Intro/Intro";
import Body from "./Body/Body";

const Home = () => {
    const [logoStart, setLogoStart] = useState(true);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setLogoStart(false);
        }, 10000);

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