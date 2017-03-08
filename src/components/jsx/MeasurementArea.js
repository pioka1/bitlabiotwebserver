import React from 'react';
import Measurement from './Measurement';

export default class MeasurementArea extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <Measurement />
                </div>
                <div className="col-md-4">
                    <Measurement />
                </div>
                <div className="col-md-4">
                    <Measurement />
                </div>
            </div>
        );
    }
}
