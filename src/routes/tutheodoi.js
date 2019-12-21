const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Tu theo doi');
});

module.exports = router;