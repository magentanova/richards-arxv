import React from 'react'

const Loader = props => 
    <img 
        alt="loading-gif"
        className="loader"
        style={{display: props.show ? "inherit" : "none"}}
        src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" />;

export default Loader;