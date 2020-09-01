import React from 'react';
import { Link } from 'react-router-dom';
import yellowHouse from '../../icons/yellow-house-icon.png';

import './index.css';

const Footer = props => 
    <div className="footer">
        <Link className="home-link" to="/" >
            <img alt="home" src={yellowHouse} />
        </Link>
    </div>

export default Footer;