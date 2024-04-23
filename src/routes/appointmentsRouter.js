const express = require('express');
const appointmentsController = require('../controllers/appointmentsController');

const router = express.Router();

router.post('/create', appointmentsController.saveAppoinment);
router.get('/', appointmentsController.getAppointments);
router.delete('/:appointmentId', appointmentsController.deleteAppointmentById)

module.exports = router;