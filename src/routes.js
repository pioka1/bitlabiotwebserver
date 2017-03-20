const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

module.exports = function(db) {
    router.get('/', function(req, res) {
        res.render('index');
    });

    router.get('/rpi', function(req, res) {
        console.log("/rpi route requested");

        let device_names = [];
        let data = {
            devices: []
        };

        db.each('SELECT * FROM Devices', function(err, row) {
            device_names.push(row.name);
            console.log(device_names);
        }, function() {
            console.log("First part DONE");
            for (let i = 0; i < device_names.length; i++) {
                console.log("inside for loop");
                let device = i + 1;
                console.log('SELECT noise, date FROM Measurements WHERE device='+device+' ORDER BY measurement_id DESC');
                db.get('SELECT noise, date FROM Measurements WHERE device='+device+' ORDER BY measurement_id DESC', function (err, row) {
                    console.log(row);
                    data.devices.push({
                        name: device_names[i],
                        noise: row.noise,
                        date: new Date(row.date)
                    });
                    console.log("launching sendJson");
                    sendJson();
                });
            }
            function sendJson() {
                console.log("inside sendJson... " + data.devices.length);
                if (data.devices.length == device_names.length) {
                    console.log(data);
                    res.json(data);
                }
            }
        });
    });

    router.get('/rpi/:device', function(req, res) {
        let device = req.params.device;

        // Database call for latest data from SQLite3


        res.send(device);
    });

    return router;
};



