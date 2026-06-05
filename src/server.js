const express = require('express');
const cors = require('cors');
const path = require('path');

const empresaRoutes = require('./routes/empresa');

const app = express();
const projectRoot = path.join(__dirname, '..');

app.use(cors());
app.use(express.json());

app.use(express.static(projectRoot));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(projectRoot, 'index.html'));
});

app.use('/empresas', empresaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});