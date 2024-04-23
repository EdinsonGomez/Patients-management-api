const appointmentsDB = require('../db/appointments.json');
const moment = require('moment');

const saveAppoinment = async (req, res) => {
  try {
    const body = req.body;

    if (!body) return res.status(400).send({ message: 'Datos faltantes' });
    
    const appointmentId = appointmentsDB[appointmentsDB.length - 1].id + 1;
    const appointmentData = {
      ...body,
      id: appointmentId,
      attention_date: moment.utc().toISOString(),
    };

    appointmentsDB.push(appointmentData);

    return res.status(200).send(appointmentData);
  } catch(error) {
    console.error('[appointmentsController save error]: ', error);
    return res.status(200).send({ message: 'Internal server error' });
  }
}

const getAppointments = async (req, res) => {
  try {
    const appointmentsList = [...appointmentsDB];

    return res.status(200).send(appointmentsList);
  } catch(error) {
    console.error('[appointmentsController get error]: ', error);
    return res.status(400).send({ message: 'Internal server error' });
  }
}

const deleteAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    console.log('appointmentId', req.params);
    const appointmentFound = appointmentsDB.findIndex(({ id }) => id === +appointmentId);

    if (appointmentFound === -1) return res.status(200).send({ message: 'No se encontro la nota' });

    const appointmentDeleted = {...appointmentsDB[appointmentFound]};
    appointmentsDB.splice(appointmentFound, 1);

    return res.status(200).send(appointmentDeleted);
  } catch(error) {
    console.error('[appointmentsController delete error]: ', error);
    return res.status(200).send({ message: 'Internal server error' });
  }
}

module.exports = {
  saveAppoinment,
  getAppointments,
  deleteAppointmentById,
}