import React, { useEffect } from 'react';

import videojs from 'video.js';

import "./video-js.min.css";
import './index.css';

import { PATH_PREFIX } from '../../settings';

const $ = sel => document.querySelector(sel);

const parseParams = paramString => {
    const paramsObj = {};
    const pairs = paramString.substr(1).split('&');
    pairs.forEach(pair => {
        const keyVal = pair.split('=');
        paramsObj[keyVal[0]] = keyVal[1];
    })
    return paramsObj
}

const Player = props => {
    const queryParams = parseParams(props.location.search)
    const startPos = parseInt(queryParams.startPos)
    const endPos = parseInt(queryParams.endPos)
    
    useEffect(() => {
        setTimeout(() => {
            const player = videojs('video-player',
                { 
                    "controls": true, 
                    "autoplay": true, 
                    "fullScreen": true,
                    "liveui": false  ,
                    "preload": "auto" 
                },
                function(){
                    this.currentTime(startPos)
                }
            );

            // make spacebar a play toggle
            window.addEventListener('keydown', e => {
                if (e.keyCode === 32) {
                    if (player.paused()) {
                        player.play();
                    }
                    else {
                        player.pause();
                    }
                }
            });

            // can't go past the end
            player.on("timeupdate", e => {
                if (player.currentTime() > (endPos - startPos)) {
                    player.pause()
                }
            });
                
            // middleware for getting current time and duration
            videojs.use("*", function(player) {
                return {
                    currentTime: ct => ct - startPos,
                    duration: () => (endPos - startPos),
                    setCurrentTime: ct => ct + startPos
                }
            })
        }, 25)
    }, [])
    return (
        <video className='video-js' id="video-player">
            {/* <source src={PATH_PREFIX + props.match.params.filename} /> */}
            <source src="https://vjs.zencdn.net/v/oceans.mp4" />
        </video>
    )
}


export default Player;