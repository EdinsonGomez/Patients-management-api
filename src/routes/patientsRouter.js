const express = require('express');
const patientsController = require('../controllers/patientsController');

const router = express.Router();

router.get('/', patientsController.getPatientsList);
router.get('/:patientId', patientsController.getPatientById);
router.put('/:patientId', patientsController.updatePatientById);

module.exports = router;