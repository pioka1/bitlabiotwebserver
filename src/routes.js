const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/smart_devices', function (req, res) {
    console.log("/smart_devices route requested");

    /*
        NOTE TO SELF:
        require('./testdata.json) doesn't work because it caches the data file!
     */

    let data = fs.readFileSync(path.join(__dirname, 'testdata.json'));
    res.json(JSON.parse(data));
});

module.exports = router;