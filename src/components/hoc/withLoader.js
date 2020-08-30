import React from 'react';

import Loader from '../Loader';

const withLoader = Component => 
    props => props.loaded ? 
        <Component {...props} /> :
        <Loader />

export default withLoader;