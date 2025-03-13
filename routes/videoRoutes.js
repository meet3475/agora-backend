const express = require('express');
const { uploadVideo } = require('../controller/video');


const router = express.Router();

router.post('/upload', uploadVideo);

module.exports = router;
