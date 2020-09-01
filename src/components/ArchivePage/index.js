import React, {useEffect, useState} from 'react';

import Header from '../Header';
import Archive from '../Archive';
import { fetchArchive } from '../../utils';

const ArchivePage = () => {
   const [ archive, setArchive ] = useState(undefined);
   
   useEffect(() => {fetchArchive().then(result => setArchive(result))} , [])
   return (
        <div className="archive-page page">
            <Header />
            <Archive archive={archive} loaded={archive !== undefined} />
        </div>
    );
};

export default ArchivePage;