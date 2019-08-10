import React from 'react';

import Header from '../Header';
import ClipCollection from '../ClipCollection';
import clipsManifest from '../../data/clips.json';

import './index.css';

const ArchivePage = () => {
    // four across, six down
    const cols = [[],[],[],[]];
    let colTitles = [];
    let currentColIndex = 0;
    let lastEndDate;
    const sortedRanges = Object.keys(clipsManifest).reverse()
    colTitles[0] = clipsManifest[sortedRanges[0]].start_date + " through "
    sortedRanges.forEach((key, i) => {
        if (cols[currentColIndex].length === 6) {
            // add end date to title
            colTitles[currentColIndex] += clipsManifest[key].end_date
            currentColIndex ++ 
            // start new title
            colTitles[currentColIndex] = clipsManifest[key].start_date + " through "
        }
        cols[ currentColIndex ].push(
            <ClipCollection 
                key={key} 
                collectionId={key} 
                title={clipsManifest[key].display_title} 
                data={clipsManifest[key]} 
            />)
    });
    colTitles[currentColIndex] += clipsManifest[sortedRanges[sortedRanges.length - 1]].end_date
    colTitles = colTitles.map(title => title.replace(/-/g,"‑"))
    return (
        <div className="archive-page">
            <Header />
            <div className="clip-collection-grid">
                {cols.map((col,i) => 
                    <div key={col + i } className="clip-collection-col">
                        <h3>{colTitles[i]}</h3>
                        {col}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArchivePage;