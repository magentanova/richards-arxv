import React, { useState, useEffect } from 'react';

import Header from '../Header';
import Uploader from '../Uploader';
import { API_ROOT } from '../../settings';

const UploadPage = props => {
    const [ s3Objects, setS3Objects ] = useState(null);
    useEffect(() => {
        fetch(`${API_ROOT}/list/all`)
            .then(
                result => result.json(),
                err => console.log(err)
            )
            .then(
                json => {
                    console.log(json)
                    setS3Objects(json)
                }
            )
    }, [])

    return (
        <div className="uploader-page">
            <Header />
            <Uploader loaded={s3Objects !== null} s3Objects={s3Objects} />
        </div>
    )
}

export default UploadPage