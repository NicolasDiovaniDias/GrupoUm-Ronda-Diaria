const express = require('express');
const cors = require('cors');
const path = require('path');

const empresaRoutes = require('./routes/empresa');
const noticiaRoutes = require('./routes/noticia');

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
app.use('/noticias', noticiaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});