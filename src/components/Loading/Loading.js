import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading">
            <div className="bar">
                <i className="sphere"></i>
            </div>
        </div>
    );
};

export default Loading;