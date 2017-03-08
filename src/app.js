/*
    Main configuration file for the Express app which is requested by the web server in /bin/www.js
 */

// Initializes external packages
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// React imports
import React from 'react';
import { Server } from 'http';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import Error404NotFound from './components/jsx/Error404NotFound';

const app = express();
const server = new Server(app);

// Pug template engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// Configuration
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Makes the following folders publicly accessible
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

// Universal routing that catches all HTTP GET requests
app.get('*', (req, res) => {

    match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
        // If Error: send Error
        if (err) return res.status(500).send(err.message);

        // If redirect (not currently used in our app)
        if (redirectLocation) return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

        // Check if route matches and render React markup
        let markup;
        if (renderProps) {
            markup = renderToString(<RouterContext {...renderProps}/>);
        } else {
            markup = renderToString(<Error404NotFound />);
            res.status(404);
        }

        // Render index template with embedded React markup
        return res.render('index', { markup });
    });

});

// start the server
const port = process.env.PORT || 3000;
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port}`);
});

// Catches 404 and forwards to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});