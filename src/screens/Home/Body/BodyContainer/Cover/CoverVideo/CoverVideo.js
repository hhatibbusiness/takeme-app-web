import React, {useEffect, useRef, useState} from 'react';
import './CoverVideo.css';

const CoverVideo = ({video}) => {
    const videoRef = useRef();
    const [plays, setPlays] = useState(true);

    const handlePlay = e => {
        console.log('After')
        const playPromise = videoRef.current.play();

        // Handle the promise to catch any potential errors
        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Autoplay started successfully
                    console.log('Autoplay started!');
                })
                .catch(error => {
                    // Autoplay failed
                    console.error('Autoplay failed:', error);
                });
        }
    }

    const handleVideoClicked = e => {
        if(videoRef.current) {
            if(plays) {
                videoRef.current.pause();
            }else {
                videoRef.current.play();
            }
            setPlays(!plays);

        }
    }

    useEffect(() => {
        console.log('Before')
        console.log()
        if(videoRef.current) {
            console.log('After')
            const playPromise = videoRef.current.play();

            // Handle the promise to catch any potential errors
            if (playPromise !== undefined) {
                playPromise
                    .then(_ => {
                        // Autoplay started successfully
                        console.log('Autoplay started!');
                    })
                    .catch(error => {
                        // Autoplay failed
                        console.error('Autoplay failed:', error);
                    });
            }
        }
    }, [video?.current]);
    return (
        <div className={'CoverVideo'}>
            <video onClick={handleVideoClicked} ref={videoRef} id="my-video" muted={true} controls={false} width="100%" height="100%" crossOrigin="anonymous">
                <source
                    src={video}
                    type="video/webm" />
                {/*<source*/}
                {/*    src="https://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v"*/}
                {/*    type="video/mp4" />*/}
            </video>
            {/*<button className={'CoverVideo__btn'}></button>*/}
        </div>
    );
};

export default CoverVideo;