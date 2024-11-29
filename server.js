const express = require('express'); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();  // Carregar variáveis de ambiente

const app = express();
const port = process.env.PORT || 3000;  // Usar a variável de ambiente PORT ou 3000

// Middleware para verificar o token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Remove "Bearer " do token
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {  // Usando a variável de ambiente para o segredo
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
        req.user = decoded; // Adiciona o usuário decodificado ao request
        next();
    });
};

// Conectar ao banco de dados MongoDB usando variável de ambiente
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch(err => console.log('Erro ao conectar ao banco de dados:', err));

// Middleware para servir arquivos estáticos e parsear JSON
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

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login bem-sucedido!', token });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao fazer login.', error: err.message });
    }
});

// Rota para validar o token
app.post('/api/validate-token', authenticateToken, (req, res) => {
    res.json({ message: 'Token válido!', user: req.user });
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
