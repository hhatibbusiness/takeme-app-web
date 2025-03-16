import React, {useEffect} from 'react';

const PersonalProfilesAdd = ({admin, setAdmin}) => {

    useEffect(() => {
        setAdmin(true);
        return () => {
            setAdmin(false);
        }
    }, []);

    return (
        <div className={'PersonalProfilesAdd'}>

        </div>
    );
};

export default PersonalProfilesAdd;