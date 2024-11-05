import React, {useEffect, useRef, useState} from 'react';
import './CoverVideo.css';
import coverDefault from '../../../../../../assets/images/defaults/take_me_cover_gif.mp4';
import coverImg from "../CoverImg/CoverImg";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";

// const coverDefault = ' https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4';

// const coverDefault = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

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
        if(videoRef.current) {
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
                    setLoaded(true);
                }}
                onError={e => {
                    setVideoData(coverDefault);
                    setKey(prevKey => prevKey + 1);
                }}
                ref={videoRef}
                id="my-video"
                muted={true}
                controls={false}
                width="100%"
                height="100%"
                crossOrigin="anonymous"
                autoPlay={true}
                loop={true}
                className={'CoverVideo__video'}
            >
                <source
                    src={videoData}
                    type="video/webm"
                />
            </video>

            {
                (!loaded) && <LoadingProduct moreAndMoreDetails={false} moreDetails={false} rentDetails={false} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false } btn={false} />

            }
        </div>
    );
};

export default React.memo(CoverVideo);