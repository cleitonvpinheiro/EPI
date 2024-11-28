const mongoose = require('mongoose')

const uniformeSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    quntidade:{
        type: Number,
        required: true
    },
    validade: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Uniforme', uniformeSchema)