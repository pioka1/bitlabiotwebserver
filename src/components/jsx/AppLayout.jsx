import React from 'react';
import MeasurementArea from './MeasurementArea.jsx';

import '../sass/AppLayout.scss';

export default class AppLayout extends React.Component {
    render() {
        return (
            <div id="app-anchor" className="container-fluid">
                <header>
                    <div className="container">
                        <h1>Live Noise Measurements @BITLAB</h1>
                    </div>
                </header>
                <main className="container-fluid"><MeasurementArea datauri="/rpi" refreshrate="10000"/></main>
                <footer>
                    <div className="container">
                        <p><strong>Created by:</strong></p>
                        <p><a>Niclas Horstad</a>, <a>Jacob Friis</a>, <a>Oliver Skjønnemand</a>, and <a>Marcel Schrode</a></p>
                    </div>
                </footer>
            </div>
        );
    }
}
