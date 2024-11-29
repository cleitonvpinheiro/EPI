const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Rota para validar o token
router.post('/validate-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtém o token do cabeçalho
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        jwt.verify(token, 'secretkey'); // Valida o token
        res.status(200).json({ message: 'Token válido.' });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
});

module.exports = router;
