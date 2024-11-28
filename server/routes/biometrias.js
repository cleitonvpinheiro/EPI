const express = require('express')
const router = express.Router()
const biometriaController = require('../controllers/biometriaController')

router.post('/', biometriaController.cadastraBiometria)

router.get('/', biometriaController.listaBiometria)

module.exports = route;