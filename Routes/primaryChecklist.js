const express = require('express');
const router = express.Router();

const primaryChecklist = require('../Controllers/primaryChecklist');

router.get('/primaryChecklist', primaryChecklist.renderPrimaryChecklist);
// router.get('/', primaryChecklist.renderPrimaryChecklist);

router.post('/submitDataP', primaryChecklist.postPrimaryChecklist);

module.exports = router;