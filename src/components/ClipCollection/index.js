import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const VIDEO_TYPE = "video";
const IMAGE_TYPE = "photo";

const ClipCollection = props => {
    const [ expanded, setExpanded ] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded)

    let contentCount = 0;
    if (props.data[VIDEO_TYPE]) {
        contentCount += Object.keys(props.data[VIDEO_TYPE]).length + 1;
    } 
    if (props.data[IMAGE_TYPE]) {
        contentCount += Object.keys(props.data[IMAGE_TYPE]).length + 1;
    }
    const maxHeight = expanded ? contentCount * 60 + "px" : 0;

    const types = Object.keys(props.data);
    return (
        <div className="clip-collection">
            <h3 onClick={toggleExpanded} >{props.title}</h3>
            <ul style={{ maxHeight }} className="clip-links" >
                {types.map(type => 
                    <div className="type-group">
                        <h4 className="type-heading">{type}</h4>
                        <div></div>
                        {Object.keys(props.data[type]).sort().map(order => {
                            const mediaObj = props.data[type][order];
                            console.log(mediaObj)
                            return (
                                <li>
                               <Link 
                                    className="clip-link"
                                    to={`/${type}/${props.collectionId}/${order}`}
                                >
                                    {mediaObj.title}
                                </Link>
                                </li>
                            )
                        })}
                    </div>
                )}                
            </ul>
        </div>
    );
};

export default ClipCollection;