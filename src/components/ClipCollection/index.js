import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const VIDEO_TYPE = "video";
const IMAGE_TYPE = "photo";

const ClipCollection = ({ year, category, data }) => {
    const [ expanded, setExpanded ] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded)

    let contentCount = 0;
    if (data[VIDEO_TYPE]) {
        contentCount += Object.keys(data[VIDEO_TYPE]).length + 1;
    } 
    if (data[IMAGE_TYPE]) {
        contentCount += Object.keys(data[IMAGE_TYPE]).length + 1;
    }
    const maxHeight = expanded ? contentCount * 60 + "px" : 0;

    const types = Object.keys(data);
    return (
        <div className="clip-collection">
            <h3 onClick={toggleExpanded} >{category}</h3>
            <ul style={{ maxHeight }} className="clip-links" >
                {types.map(type => 
                    <div key={type} className="type-group">
                        <h4 className="type-heading">{type}</h4>
                        <div></div>
                        {Object.keys(data[type]).sort().map(order => {
                            const mediaObj = data[type][order];
                            console.log(mediaObj)
                            return (
                                <li key={type + order}>
                                    <Link 
                                            className="clip-link"
                                            to={`/view/${year}/${category}/${type}/${order}`}
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