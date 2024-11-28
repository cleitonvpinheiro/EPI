const mongoose = require('mongoose');

// URL de conexão com o MongoDB
const mongoURI = 'mongodb://localhost:27017/epi'; // Use o nome do seu banco de dados, ex: 'epi'

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Encerra o aplicativo em caso de erro
  }
};

module.exports = connectDB;
