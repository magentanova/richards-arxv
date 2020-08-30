import React, {useEffect, useState} from 'react';

import Header from '../Header';
import Archive from '../Archive';
import { API_ROOT } from '../../settings';
import { parseS3Objects } from '../../utils';

const FETCH_URL = `${API_ROOT}/list/all`;

const ArchivePage = () => {
   const [ archive, setArchive ] = useState(undefined);
   useEffect(() => {
        fetch(FETCH_URL)
            .then(
                resp => resp.json(),
                err => console.error(err)
            )
            .then(
                json => setArchive(parseS3Objects(json))
            );
   }, [])
   return (
        <div className="archive-page page">
            <Header />
            <Archive
                archive={archive}
                loaded={archive !== undefined} />
        </div>
    );
};

export default ArchivePage;