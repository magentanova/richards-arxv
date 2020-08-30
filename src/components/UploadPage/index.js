import React, { useState, useEffect } from 'react';

import Header from '../Header';
import Uploader from '../Uploader';
import { API_ROOT } from '../../settings';
import { fetchArchive, getAllCategories } from '../../utils';

const UploadPage = props => {
    const [ categories, setCategories ] = useState(null);
    useEffect(() => {
        fetchArchive().then(
            result => setCategories(getAllCategories(result))
        )
    }, []);

    return (
        <div className="uploader-page">
            <Header />
            <Uploader loaded={categories !== null} categories={categories} />
        </div>
    )
}

export default UploadPage