const express = require('express')
const User = require('..//models/user')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({message: 'Usuário já existe!'})
        }

        const newUser = new User({ username, password })
        await newUser.save()
        
        res.status(201).json({message: 'Usuário criado com sucessp!'})
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuario.', error: err.message})
    }
})

module.exports = router