const express = require('express');
const router = express.Router();

const sandPlant1Checklist = require('../Controllers/sandPlant1Checklist');

router.get('/sandPlant1Checklist', sandPlant1Checklist.renderSandPlant1Checklist);

router.post('/submitData1', sandPlant1Checklist.postSandPlant1Checklist);

module.exports = router;
