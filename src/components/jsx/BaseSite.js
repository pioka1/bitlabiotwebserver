//require('../sass/Globals.scss');

import React from 'react';

export default class MainContent extends React.Component {
    render() {
        return (
            <div id="react-app-anchor" className="container-fluid">
                <header>
                    <h1>Live Noise Measurements</h1>
                </header>
                <main className="container">{this.props.children}</main>
                <footer>
                    <p><strong>Created by:</strong></p>
                    <p><a>Niclas Horstad</a>, <a>Jacob Friis</a>, <a>Oliver Skjønnemand</a>, og <a>Marcel Schrode</a></p>
                </footer>
            </div>
        );
    }
}
