import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as NextIcon } from '../../icons/next.svg';
import { ReactComponent as PrevIcon } from '../../icons/prev.svg';
import yellowHouse from '../../icons/yellow-house-icon.png';
import withLoader from '../hoc/withLoader';
import { PATH_PREFIX } from '../../settings';
import './index.css';

const Player = props => {
    let {
        year, category, type, order 
     } = props.match.params;

    order = parseInt(order);
    const relatedIndexes = Object.keys(props.archive[year][category][type]).map(idx => parseInt(idx));
    const fileData = props.archive[year][category][type][order];

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

    useEffect(() => {
        window.addEventListener("keydown", toggleWithSpace)
        return () => {
            window.removeEventListener("keydown", toggleWithSpace)
        }
    })

    const viewer = type === "video" ? 
        <video
            controls 
            autoPlay 
            key={category + order}
            id="video-player">
            <source 
                type="video/mp4" 
                src={`${PATH_PREFIX}/${fileData.key}`} />
        </video> :
        <img alt={fileData.title} src={`${PATH_PREFIX}/${fileData.key}`} />
    return (
        <div className="player-page page">
            <Link className="home-link" to="/" >
                <img alt="home" src={yellowHouse} />
            </Link>
            <h1>{decodeURIComponent(fileData.title)}</h1>
            <div className="tv-screen">
                {viewer}
                <div className="nav-icon-container">
                    <Link
                        to={`/view/${year}/${category}/${type}/${order - 1}`}>
                        <PrevIcon
                            style={{visibility: relatedIndexes[order - 1] ? "visible" : "hidden"}} 
                            className="nav-icon prev-icon" />
                    </Link>
                    <Link
                        to={`/view/${year}/${category}/${type}/${order + 1}`}>
                    <NextIcon 
                        style={{visibility: relatedIndexes[order + 1] ? "visible" : "hidden"}} 
                        className="nav-icon next-icon" />
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default withLoader(Player);