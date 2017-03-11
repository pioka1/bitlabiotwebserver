import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './components/jsx/AppLayout.jsx';

import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './components/sass/global.scss';

window.onload = () => {
    ReactDOM.render(<AppLayout/>, document.getElementsByTagName('body')[0]);
};