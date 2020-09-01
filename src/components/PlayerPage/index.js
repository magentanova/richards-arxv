import React, { useEffect, useState } from 'react';

import Player from '../Player';
import Footer from '../Footer';
import { fetchArchive } from '../../utils';

const PlayerPage = props => {
    const [ archive, setArchive ] = useState(undefined);

    useEffect(() => {fetchArchive().then(result => setArchive(result))}, []);

    return (
        <div className="page player-page">
            <Player 
                loaded={archive !== undefined}
                archive={archive}
                match={props.match}
            />
            <Footer />
        </div>
    )
}

export default PlayerPage;