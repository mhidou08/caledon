const express = require('express');
const router = express.Router();

const sandPlant2Checklist = require('../Controllers/sandPlant2Checklist');

router.get('/sandPlant2Checklist', sandPlant2Checklist.renderSandPlant2Checklist);

router.post('/submitData2', sandPlant2Checklist.postSandPlant2Checklist);

module.exports = router;
