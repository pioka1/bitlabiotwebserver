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

        // Save all device names in an array
        db.each('SELECT * FROM Devices', function(err, row) {
            if (err) return;
            device_names.push(row.name);
            console.log(device_names);
        }, function(err, numberOfRows) {
            if (err) {
                console.error(err);
                return res.status(500).send();
            } else if (numberOfRows == 0) {
                return res.json(data);
            }

            // Loop through all devices
            for (let i = 0; i < numberOfRows; i++) {
                let device = i + 1; // AUTO INCREMENT Id begins at 1 and not 0

                // Get only latest measurements from each device
                db.get('SELECT noise, date FROM Measurements WHERE device='+device+' ORDER BY measurement_id DESC', function (err, row) {
                    console.log(row);
                    data.devices.push({
                        name: device_names[i],
                        noise: row.noise,
                        date: row.date
                    });
                    console.log("launching sendJson");
                    sendJson();
                });
            }
            function sendJson() {
                console.log("inside sendJson... " + data.devices.length);
                if (data.devices.length == numberOfRows) {
                    data.devices = data.devices.sort(function(a, b) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    });
                    console.log(data);
                    res.json(data);
                }
            }
        });
    });

    router.get('/rpi/:device', function(req, res) {
        let device = req.params.device;
        let limit = req.query.limit;
        console.log("Params: " + device);
        console.log("Queries: " + limit);
        let device_id;
        let data = [];
        // Database call for latest data from SQLite3
        db.get('SELECT id FROM Devices WHERE name = ?', device, function (err, row) {
            if (err) {
                console.error("Error at SELECT id\n" + err);
                return res.status(404).send('Error: Device does not exist in database.');
            }
            device_id = row.id;
            console.log("Device id: " + device_id);

            /*
             *   TODO: If a limit parameter is included, change the database call accordingly.
             */
            db.each('SELECT * FROM Measurements WHERE device = ? ORDER BY measurement_id DESC LIMIT 50', device_id, function(err, row) {
                if (err) {
                    console.error("Error at SELECT Measurements\n" + err);
                    // Send empty array if Device exists but no Measurement records
                    return res.json({ "device_name": device, "device_id": device_id, "measurements": data });
                }
                // Add each row to data variable
                data.push({ "noise": row.noise, "date": row.date });
            }, function(err) {
                if (err) return console.error("Error at final function\n" + err);
                // Send JSON with data array as response
                res.json({
                    "device_name": device,
                    "device_id": device_id,
                    "measurements": data
                });
            });
        });
    });

    router.post('/rpi/:device', function(req, res){
        let new_resource = false;

        // Device url must match device name provided in JSON payload
        if (!req.params.device === req.body.device) {
            return res.status(403).send("Device param does not match device name in JSON payload");
        }

        console.log(req.body);

        // Check if device exists
        console.log("Checking if device exists...");
        db.get("SELECT id FROM Devices WHERE name = ?", req.body.device, function (err, row) {
            if (!row) {

                db.run('INSERT INTO Devices(name) VALUES (?)', req.body.device, function(err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    console.log("Device does not exist in database. Performed INSERT query.");
                    console.log(this);
                    new_resource = true;
                    runInsertWithId(this.lastID);
                });

            } else {
                console.log("Row retrieved:");
                console.log(row);
                runInsertWithId(row.id);
            }

            function runInsertWithId(id) {
                console.log("Running INSERT INTO with following id: " + id);
                // Use ID to post Measurement
                db.run('INSERT INTO Measurements(device, noise, date) VALUES (?, ?, ?)', [id, req.body.noise, req.body.date], function(err) {
                    if (err) return res.status(500).send("Something broke..");
                    if (new_resource) return res.status(201).send("Device created and measurements stored successfully");
                    res.send("Measurements stored successfully");
                });
            }

        });

    });

    return router;
};



