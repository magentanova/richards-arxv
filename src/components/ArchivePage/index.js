import React from 'react';

import Header from '../Header';
import ClipCollection from '../ClipCollection';
import clipData from '../../data/clips.json';

import './index.css';

const ArchivePage = () => {
    // four across, six down
    const cols = [[],[],[],[]];
    let colTitles = [];
    let currentColIndex = 0;
    let lastEndDate;
    const sortedRanges = Object.keys(clipData).reverse()
    colTitles[0] = clipData[sortedRanges[0]].start_date + " through "
    sortedRanges.forEach((key, i) => {
        if (cols[currentColIndex].length === 6) {
            // add end date to title
            colTitles[currentColIndex] += clipData[key].end_date
            currentColIndex ++ 
            // start new title
            colTitles[currentColIndex] = clipData[key].start_date + " through "
        }
        cols[ currentColIndex ].push(<ClipCollection key={key} title={clipData[key].display_title} data={clipData[key]} />)
    });
    colTitles[currentColIndex] += clipData[sortedRanges[sortedRanges.length - 1]].end_date
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