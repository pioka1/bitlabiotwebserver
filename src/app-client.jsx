import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './components/jsx/AppLayout.jsx';

import './components/sass/Globals.scss';

window.onload = () => {
    ReactDOM.render(<AppLayout/>, document.getElementsByTagName('body')[0]);
};