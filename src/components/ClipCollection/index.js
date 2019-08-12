import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const ClipCollection = props => {
    const [ expanded, setExpanded ] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded)

    const maxHeight = expanded ? Object.keys(props.data.clips).length * 60 + "px" : 0

    const clipsObj = props.data.clips
    return (
        <div className="clip-collection">
            <h3 onClick={toggleExpanded} >{props.title}</h3>
            <ul style={{ maxHeight }} className="clip-links" >
                {Object.keys(clipsObj).sort((a,b) => parseInt(a) > parseInt(b) ).map( clipKey => 
                    <li key={clipKey} >
                        <Link 
                            className="clip-link"
                            to={`/player/${props.collectionId}/${clipsObj[clipKey].index}`}
                            >
                            {clipsObj[clipKey].title}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ClipCollection;