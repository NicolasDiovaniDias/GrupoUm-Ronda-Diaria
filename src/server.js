const express = require('express');
const cors = require('cors');
const path = require('path');

const empresaRoutes = require('./routes/empresa');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('API rodando!');
});

app.use('/empresas', empresaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});