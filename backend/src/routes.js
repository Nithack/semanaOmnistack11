const express = require('express');

const OngController = require('./controllers/ongControllers');
const incidentCotrollers = require('./controllers/IncidentController');
const profileCotrollers = require('./controllers/profileController');
const sessionCotrollers = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionCotrollers.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create);

routes.post('/incidents',incidentCotrollers.create)
routes.get('/incidents',incidentCotrollers.index)
routes.delete('/incidents/:id', incidentCotrollers.delete)

routes.get('/profile',profileCotrollers.index)

module.exports = routes