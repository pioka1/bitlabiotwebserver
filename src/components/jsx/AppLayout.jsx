import React from 'react';
import MeasurementArea from './MeasurementArea.jsx';
import Clock from './Clock.jsx';
import LogoImg from '../../assets/cbs_logo.svg';

import '../sass/AppLayout.scss';

export default class AppLayout extends React.Component {
    render() {
        return (
            <div id="app-anchor" className="container-fluid">
                <div id="app-background"></div>
                <header>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <img id="cbs-logo" src={LogoImg} />
                            </div>
                            <div className="col-md-4">
                                <h1>Live Noise Measurements @BITLAB</h1>
                            </div>
                            <div className="col-md-4">
                                <Clock/>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="container-fluid"><MeasurementArea datauri="/rpi" refreshrate="10000"/></main>
                <footer>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <p><strong>Created by: </strong><a href="mailto:niho12ag@student.cbs.dk">Niclas Horstad</a>, <a href="mailto:jafr15aj@student.cbs.dk">Jacob Friis</a>, <a href="mailto:olsk15ab@student.cbs.dk">Oliver Skjønnemand</a>, and <a href="mailto:masc16ay@student.cbs.dk">Marcel Schrode</a></p>
                            </div>
                            <div className="col-md-4">
                                <button id="contact-us-btn" onclick="location.href='mailto:rup.itm@cbs.dk';">Contact Us</button>
                            </div>
                            <div className="col-md-4">
                                <p id="copyright">Copyright &copy; 2017. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                    <div className="container">

                    </div>
                </footer>
            </div>
        );
    }
}
