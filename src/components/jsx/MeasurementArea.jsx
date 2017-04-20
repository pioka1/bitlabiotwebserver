import React from 'react';
import jQuery from 'jquery';
import Measurement from './Measurement.jsx';

export default class MeasurementArea extends React.Component {
    constructor() {
        super();
        this.state = {
            devices: [],
            timer: 0
        };
    }

    getDeviceData() {
        console.log("React: Running getDeviceData()...");
        let self = this;
        jQuery.get( self.props.datauri, function(data) {
            console.log(data.devices);

            self.setState((prevState) => {
                return {
                    devices: data.devices,
                    timer: prevState.timer
                };
            });
        });
    }

    launchTimer() {
        let self = this;
        let timer = (self.props.refreshrate / 1000) - 1;
        console.log(timer);
        updateTimer();

        setInterval(function () {
            if (!(timer === 0)) {
                timer--;
            } else {
                timer = (self.props.refreshrate / 1000) - 1;
            }
            console.log(timer);
            updateTimer();
        }, 1000);

        function updateTimer() {
            self.setState((prevState) => {
                return {
                    devices: prevState.devices,
                    timer: timer
                };
            });
        }
    }

    componentDidMount() {
        console.log("React: Running componentDidMount()...");
        this.launchTimer();
        this.getDeviceData();
        setInterval(this.getDeviceData.bind(this), parseInt(this.props.refreshrate));
    }

    render() {
        console.log("React: Current state of \"devices\":");
        console.log(this.state);
        let rowsOfMeasurements = this.state.devices.map((device) => {
            return (
                <Measurement key={device.name} name={device.name} noise={device.noise} date={device.date} />
            );
        });
        return (
            <div>
                <div className="row">
                    <ul>
                        {rowsOfMeasurements}
                    </ul>
                    <p id="update_timer">Updating in {this.state.timer}</p>
                </div>
            </div>
        );
    }
}
