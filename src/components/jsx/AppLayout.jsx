import React from 'react';
import MeasurementArea from './MeasurementArea.jsx';

export default class AppLayout extends React.Component {
    render() {
        return (
            <div id="app-anchor" className="container-fluid">
                <header>
                    <h1>Live Noise Measurements</h1>
                </header>
                <main className="container"><MeasurementArea datauri="/data" refreshrate="2000"/></main>
                <footer>
                    <p><strong>Created by:</strong></p>
                    <p><a>Niclas Horstad</a>, <a>Jacob Friis</a>, <a>Oliver Skjønnemand</a>, og <a>Marcel Schrode</a></p>
                </footer>
            </div>
        );
    }
}
