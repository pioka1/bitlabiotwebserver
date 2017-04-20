import React from 'react';

//require('../sass/Measurement.scss');

export default class Measurement extends React.Component {
    render() {
        let date_formatted = new Date(parseInt(this.props.date)).toString();
        return (
            <li className="measurement">
                <h2>{this.props.name}</h2>
                <h1>{this.props.noise} dB</h1>
                <br></br>
                <p>Recorded on:</p>
                <p>{date_formatted}</p>
            </li>
        );
    }
}
