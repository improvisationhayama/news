const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Y ta');
});

module.exports = router;