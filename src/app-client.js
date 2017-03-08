import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/jsx/AppRoutes';

window.onload = () => {
    ReactDOM.render(<AppRoutes/>, document.getElementsByTagName('body')[0]);
};