import React from 'react';

//require('../sass/Measurement.scss');

export default class Measurement extends React.Component {
    render() {
        return (
            <li className="measurement">
                Name: {this.props.name} Noise: {this.props.noise}
            </li>
        );
    }
}
