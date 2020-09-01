import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ReactComponent as NextIcon } from '../../icons/next.svg';
import { ReactComponent as PrevIcon } from '../../icons/prev.svg';
import Loader from '../Loader';
import withLoader from '../hoc/withLoader';
import { PATH_PREFIX } from '../../settings';
import './index.css';

const Player = props => {
    let {
        year, category, type, order 
     } = props.match.params;

    //  handle navigation between images
    order = parseInt(order);
    const allOrdinals = Object.keys(props.archive[year][category][type]).map(idx => parseInt(idx)).sort();
    const thisIndex = allOrdinals.indexOf(order);
    const canGoPrev = allOrdinals[thisIndex - 1] !== undefined;
    const canGoNext = allOrdinals[thisIndex + 1] !== undefined
    const prevLink = `/view/${year}/${category}/${type}/${allOrdinals[thisIndex - 1]}`;
    const nextLink = `/view/${year}/${category}/${type}/${allOrdinals[thisIndex + 1]}`;

    const fileData = props.archive[year][category][type][order];

    const history = useHistory();

    const [ mediaWidth, setMediaWidth ] = useState("auto");
    const [ mediaLoaded, setMediaLoaded ] = useState(false);

    const mediaRef = useRef();
    useEffect(() => {
        window.addEventListener("keydown", toggleWithSpace)
        window.addEventListener("keydown", navigateInSequence)
        return () => {
            window.removeEventListener("keydown", toggleWithSpace)
            window.removeEventListener("keydown", navigateInSequence)
        }
    });
    useEffect(() => {
        setMediaLoaded(false);
    }, [order])

    console.log(props.match.params.order)
    console.log(mediaLoaded)

    const navigateInSequence = e => {
        if (e.keyCode === 37) {
            // left
            if (canGoPrev) {
                history.push(prevLink);
            }
        }
        if (e.keyCode === 39) {
            // right
            if (canGoNext) {
                history.push(nextLink);
            }
        }
    }

    const toggleWithSpace = e => {
        if (e.keyCode === 32) {
            const video = document.querySelector('video')
            if (!video) {
                return;
            }
            if (video.paused) {
                video.play() 
            }
            else {
                video.pause()
            }
        }
    }

    const handleMediaLoad = e => {
        setMediaLoaded(true);
        const el = mediaRef.current;
        if (el.width > el.height) {
            setMediaWidth(80 + "%");
        }
        else {
            const rect = el.getBoundingClientRect();
            window.rect = rect;
            const ratio = rect.width / rect.height;
            setMediaWidth(.8 * rect.height * ratio + "px")
            console.log(el.width / el.height)
        }
    }

    const viewer = type === "video" ? 
        <video
            controls 
            autoPlay 
            key={category + order}
            id="video-player"
            onLoadedData={handleMediaLoad}
            ref={mediaRef}
            >
            <source 
                type="video/mp4" 
                src={`${PATH_PREFIX}/${fileData.key}`} />
        </video> :
        <img 
            alt={fileData.title} 
            src={`${PATH_PREFIX}/${fileData.key}`} 
            onLoad={handleMediaLoad}
            ref={mediaRef}
            />

    return (
        <div className="player-page page">
            <h1>{decodeURIComponent(fileData.title)}</h1>
            <div className="tv-screen">
                <Loader show={!mediaLoaded}/>
                <div 
                    style={{
                        visibility: mediaLoaded ? "visible" : "hidden",
                        maxWidth: mediaWidth
                    }}
                    className="media-container" >
                    {viewer}
                </div>
                <div className="nav-icon-container">
                    <Link
                        to={prevLink}>
                        <PrevIcon
                            style={{visibility: canGoPrev ? "visible" : "hidden"}} 
                            className="nav-icon prev-icon" />
                    </Link>
                    <Link
                        to={nextLink}>
                    <NextIcon 
                        style={{visibility: canGoNext ? "visible" : "hidden"}} 
                        className="nav-icon next-icon" />
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default withLoader(Player);