import React from 'react';

import ClipCollection from '../ClipCollection';
import withLoader from '../hoc/withLoader';
import clipsManifest from '../../data/clips.json';

import './index.css';

const Archive = props => {
    const archive = props.archive
    const cols = [];
    const sortedYears = Object.keys(props.archive).sort()
    sortedYears.forEach(year =>
        cols.push(
            Object.keys(archive[year]).map(category => 
                <ClipCollection 
                key={category} 
                collectionId={category} 
                title={category} 
                data={archive[year][category]} 
            />)
        )
    );
    return (
        <div className="archive">
            <div className="clip-collection-grid">
                {cols.map((col,i) => 
                    <div key={col + i } className="clip-collection-col">
                        <h3>{sortedYears[i]}</h3>
                        {col}
                    </div>
                )}
            </div>
        </div>
    );
};

export default withLoader(Archive);