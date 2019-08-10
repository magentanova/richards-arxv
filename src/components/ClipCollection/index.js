import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const ClipCollection = props => {
    const [ expanded, setExpanded ] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded)

    const maxHeight = expanded ? Object.keys(props.data.clips).length * 40 + "px" : 0

    return (
        <div className="clip-collection">
            <h3 onClick={toggleExpanded} >{props.title}</h3>
            <ul style={{ maxHeight }} className="clip-links" >
                {Object.keys(props.data.clips).reverse().map( clipKey => 
                    <li key={clipKey} >
                        <Link 
                            className="clip-link"
                            target="_blank"
                            to={`/player/${props.data.clips[clipKey].mp4_filename}?startPos=${props.data.clips[clipKey].start_pos}&endPos=${props.data.clips[clipKey].end_pos}&title=${props.data.clips[clipKey].title}`}
                            >
                            {props.data.clips[clipKey].title}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ClipCollection;