/*
    The non-visible Router component needed for a Single Page Application (SPA) to route properly.
    Normally, a router serves entire HTML pages for every HTTP request. In this app, we use React
    to only request the HTML that needs to change based on the requested route.
*/

import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../../routes';

export default class AppRoutes extends React.Component {
    render() {
        return (
            <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
        );
    }
}
