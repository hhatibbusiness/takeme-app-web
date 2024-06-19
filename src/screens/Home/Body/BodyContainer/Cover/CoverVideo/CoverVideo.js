import React, {useEffect, useRef, useState} from 'react';
import './CoverVideo.css';
import coverDefault from '../../../../../../assets/images/defaults/take_me_cover_gif.webm';
import coverImg from "../CoverImg/CoverImg";

// const coverDefault = ' https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

const CoverVideo = ({video, loaded, setLoaded}) => {
    const videoRef = useRef();
    const [plays, setPlays] = useState(true);
    const [videoData, setVideoData] = useState(video);
    const [key, setKey] = useState(0);

    // useEffect(() => {
    //     setVideoData(video);
    // }, []);

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
            <video
                key={key}
                onClick={handleVideoClicked}
                onLoadedData={e => {
                    console.log('video is loaded successfully!');
                    setLoaded(true);
                }}
                onError={e => {
                    setLoaded(true);
                    setVideoData(coverDefault);
                    console.log(e);
                    setKey(prevKey => prevKey + 1);
                }}
                ref={videoRef}
                id="my-video"
                muted={true}
                controls={false}
                width="100%"
                height="100%"
                crossOrigin="anonymous"
            >
                <source
                    src={videoData}
                    type="video/webm"
                />
            </video>
        </div>
    );
};

export default React.memo(CoverVideo);