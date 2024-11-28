const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para verificar o token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        req.user = decoded;
        next();
    });
};

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/epi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch(err => console.log('Erro ao conectar ao banco de dados:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Modelo do usuário
const User = require('./server/models/user');

// Rota de login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, 'secretkey', { expiresIn: '1h' });
        res.json({ message: 'Login bem-sucedido!', token });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao fazer login.', error: err.message });
    }
});

// Rota pública
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota protegida
app.get('/dashboard', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
