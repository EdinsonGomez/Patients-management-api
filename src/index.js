const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const patientsRouter = require('./routes/patientsRouter');
const appointmentsRouter = require('./routes/appointmentsRouter');

const app = express();
const port = 8080;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/patients', patientsRouter);
app.use('/appointments', appointmentsRouter);

app.listen(port, () => {
  console.log('Server listening in port: ', port);
});