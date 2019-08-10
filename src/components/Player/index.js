import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import clipsManifest from '../../data/clips.json';
import { ReactComponent as NextIcon } from './next.svg';
import { ReactComponent as PrevIcon } from './prev.svg';
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
    const parentFolder = filename.split('.mp4')[0].substr(0,filename.length - 6)
        
    return (
        <div className="player-page">
            <Link href="/">
                <img alt="home" src="public/yellow-house-icon.png" />
            </Link>
            <h1>{decodeURIComponent(clipData.title)}</h1>
            <div className="tv-screen">
                <video
                    controls 
                    autoPlay 
                    key={collectionId + index}
                    id="video-player">
                    <source type="video/mp4" src={`${PATH_PREFIX}/${parentFolder}/${filename}`} />
                    {/* <source 
                        type="video/mp4"
                        src="https://richards-family-theater.s3.amazonaws.com/clips-by-date-range/1985_09+-+1986_08/1985_09++-+1986_0801.mp4"></source> */}
                </video>
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
    )
}


export default Player;