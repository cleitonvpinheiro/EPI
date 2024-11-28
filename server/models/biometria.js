const mongoose = require('mongoose')

const biometriaSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    biometriaData: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('biometria', biometriaSchema)