import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import clipsManifest from '../../data/clips.json';
import { ReactComponent as NextIcon } from '../../icons/next.svg';
import { ReactComponent as PrevIcon } from '../../icons/prev.svg';
import yellowHouse from '../../icons/yellow-house-icon.png';
import { PATH_PREFIX } from '../../settings';
import './index.css';

// const parseParams = paramString => {
//     const paramsObj = {};
//     const pairs = paramString.substr(1).split('&');
//     pairs.forEach(pair => {
//         const keyVal = pair.split('=');
//         paramsObj[keyVal[0]] = keyVal[1];
//     })
//     return paramsObj
// }

const Player = props => {
    // get clip data from manifest
    const collectionId = props.match.params.collectionId
    const index = parseInt(props.match.params.index)
    const clipSet = clipsManifest[collectionId].clips
    const clipData = clipSet[index]

    // derive folder name from filename according to (fragile?) convention
    const filename = clipData.mp4_filename
    const parentFolder = collectionId
        

    const toggleWithSpace = e => {
        if (e.keyCode === 32) {
            const video = document.querySelector('video')
            if (video.paused) {
                video.play() 
            }
            else {
                video.pause()
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", toggleWithSpace)
        return () => {
            window.removeEventListener("keydown", toggleWithSpace)
        }
    })
    return (
        <div className="player-page page">
            <Link className="home-link" to="/" >
                <img alt="home" src={yellowHouse} />
            </Link>
            <h1>{decodeURIComponent(clipData.title)}</h1>
            <div className="tv-screen">
                <video
                    controls 
                    autoPlay 
                    key={collectionId + index}
                    id="video-player">
                    <source 
                        type="video/mp4" 
                        src={`${PATH_PREFIX}/${parentFolder}/${filename}`} />
                </video>
                <div className="nav-icon-container">
                    <Link
                        to={`/player/${collectionId}/${index - 1}`}>
                        <PrevIcon
                            style={{visibility: clipSet[index - 1] ? "visible" : "hidden"}} 
                            className="nav-icon prev-icon" />
                    </Link>
                    <Link
                        to={`/player/${collectionId}/${index + 1}`}>
                    <NextIcon 
                        style={{visibility: clipSet[index + 1] ? "visible" : "hidden"}} 
                        className="nav-icon next-icon" />
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Player;