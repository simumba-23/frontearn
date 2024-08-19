import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
            <li><Link to="/tasks">All Tasks</Link></li>
                <li><Link to="/tasks/video">Video Tasks</Link></li>
                <li><Link to="/tasks/Music">Music Tasks</Link></li>
                <li><Link to="/tasks/Ad">Ad Tasks</Link></li>
                <li><Link to="/tasks/article">Article Tasks</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
