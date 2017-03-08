/*
    This file is the master React component that renders all other components internally.
    React is powerful because it can be rendered here on the server instead of on the
    client's web browser.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BaseSite from './components/jsx/BaseSite';
import MeasurementArea from './components/jsx/MeasurementArea';
import Error404NotFound from './components/jsx/Error404NotFound';

const routes = (
    <Route path="/" component={BaseSite}>
        <IndexRoute component={MeasurementArea}/>
        <Route path="*" component={Error404NotFound}/>
    </Route>
);

export default routes;