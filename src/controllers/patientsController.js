const patientsDB = require('../db/patients.json');
const appointmentsDB = require('../db/appointments.json');
const moment = require('moment');

const getPatientsList = async (req, res) => {
  try {
    const patientsList = patientsDB.map((p) => {
      let appointments = appointmentsDB.filter(({ patient_id }) => patient_id === p.id);
      let data = {...p};

      if (appointments.length !== 0) {
        appointments.sort((a, b) => {
          return new Date(b.attention_date) - new Date(a.attention_date);
        });

        const appointmentData = {...appointments[0]};
        appointmentData.appointment_id = appointmentData.id;

        delete appointmentData.id;

        data = {
          ...data,
          ...appointmentData,
        }
      }

      return data;
    })

    return res.status(200).send(patientsList);
  } catch(error) {
    console.log('[patientsController get list error]: ', error);
    return res.status(400).send({ message: 'Internal server error' });
  }
}

const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    let patientData = patientsDB.find(({ id }) => id === +patientId);

    if (!patientData) return res.status(400).send({ message: 'Paciente no encontrado' });

    patientData.age = moment().diff(moment(patientData.birthdate), 'y');

    return res.status(200).send(patientData);
  } catch(error) {
    console.log("[patientController getPatientById error]: ", error);
    return res.status(400).send({ message: 'Paciente no encontrado' });
  }
}

const updatePatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const body = req.body;

    const patientIdx = patientsDB.findIndex(({ id }) => id === +patientId);

    const updatedPatient = {
      ...patientsDB[patientIdx],
      ...body
    };

    patientsDB.splice(patientIdx, 1, updatedPatient);
    console.log('patient: ', patientsDB[patientIdx])

    return res.status(200).send(patientsDB[patientIdx]);
  } catch(error) {
    console.log("[patientController updatePatientById error]: ", error);
  }
}


module.exports = {
  getPatientsList,
  getPatientById,
  updatePatientById,
}