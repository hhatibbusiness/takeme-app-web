import React, {useState, useEffect} from 'react';
import './Install.css';
import {useTranslation} from "react-i18next";

const Install = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI to show the install button
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setIsInstallable(false);
    };

    if (!isInstallable) {
        return null;
    }

    return (
        <div onClick={handleInstallClick} className={'Install'}>
            <i className="fa-solid fa-download"></i>
            <p>{t('install')}</p>
        </div>
    );
};

export default Install;