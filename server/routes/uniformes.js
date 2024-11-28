const express = require('express')
const router  = express.Router()
const uniformeController = require('../controllers/uniformeController')

router.post('/', uniformeController.cadastraUniforme)

router.get('/', uniformeController.listaUniforme)

module.exports = router;