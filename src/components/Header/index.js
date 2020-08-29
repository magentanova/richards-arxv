import React from 'react';
import {APP_TITLE, APP_SUBTITLE} from '../../settings';

import './index.css';

const Header = () => {
    return (
        <div className="header">
            <h1>{APP_TITLE}</h1>
            <h2>{APP_SUBTITLE}</h2>
        </div>
    );
};

export default Header;