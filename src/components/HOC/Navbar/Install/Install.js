import React, {useState, useEffect} from 'react';
import './Install.css';

const Install = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI to show the install button
            setIsInstallable(true);
        };

        console.log('It Reached!');

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Clear the deferredPrompt variable
        setDeferredPrompt(null);
        // Optionally hide the install button
        setIsInstallable(false);
    };

    // if (!isInstallable) {
    //     return null;
    // }

    return (
        <div onClick={handleInstallClick} className={'Install'}>
            <i className="fa-solid fa-download"></i>
        </div>
    );
};

export default Install;