import React, { useEffect } from 'react';

import videojs from 'video.js';

import { PATH_PREFIX } from '../../settings';
import "./video-js.min.css";
import './index.css';

const vhs = require('@videojs/http-streaming');

console.log(vhs)
console.log(videojs)


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
    let endPos = parseInt(queryParams.endPos)
    
    useEffect(() => {
        setTimeout(() => {
            const player = videojs('video-player',
                { 
                    "controls": true, 
                    "fullScreen": true,
                    "preload": "auto" 
                }, function() {
                    this.currentTime(0);
                    // done twice because there are issues with race conditions
                }
            );

            player.on('loadedmetadata', function(){
                this.currentTime(0);
            });


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

            // can't go past the end of the clip
            player.on("timeupdate", e => {
                // console.log(player.currentTime())
                if (player.currentTime() > (endPos - startPos)) {
                    player.pause()
                }
            });
                
            // middleware for getting current time and duration
            videojs.use("*", function(player) {
                return {
                    currentTime: ct => {
                        return ct - startPos
                    },
                    duration: () => {
                        if (!endPos) {
                            endPos = $("video").duration;
                        }
                        return (endPos - startPos)
                    },
                    setCurrentTime: ct => {
                        return ct + startPos
                    }
                }
            })
        }, 25)
    }, [])
    return (
        <div className="player-page">
            <h1>{decodeURIComponent(queryParams.title)}</h1>
            <video className='video-js' id="video-player">
                {/* <source src={PATH_PREFIX + props.match.params.filename} /> */}
                <source 
                    type="video/mp4"
                    src="https://richards-family-theater.s3.amazonaws.com/clips-by-date-range/1985_09+-+1986_08/1985_09++-+1986_0801.mp4"></source>
            </video>
        </div>
    )
}


export default Player;