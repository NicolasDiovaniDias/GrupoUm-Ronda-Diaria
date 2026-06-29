const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const SITES_PAGOS = [
    'Valor Econômico', 'Bloomberg Linea Brasil', 'O Globo',
    'Folha de S.Paulo', 'O Estado de S. Paulo', 'Exame'
];

async function extrairTexto(link) {
    const response = await axios.get(link, {
        timeout: 8000,
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RondaDiaria/1.0)'
        }
    });

    const $ = cheerio.load(response.data);

    $('script, style, nav, header, footer, aside, iframe, noscript').remove();

    const texto = $('article, main, .content, .article-body, .post-content, #content')
        .first()
        .text()
        || $('body').text();

    return texto.replace(/\s+/g, ' ').trim().slice(0, 4000);
}

async function resumirComDeepSeek(texto, titulo) {
    const response = await axios.post(
        'https://api.deepseek.com/chat/completions',
        {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: 'Você é um assistente que resume notícias de forma curta e objetiva em português. Máximo 3 linhas.'
                },
                {
                    role: 'user',
                    content: `Resumo da notícia "${titulo}":\n\n${texto}`
                }
            ],
            max_tokens: 150
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.choices[0].message.content.trim();
}

router.post('/', async (req, res) => {
    const { noticias } = req.body;

    if (!Array.isArray(noticias) || noticias.length === 0) {
        return res.status(400).json({ sucesso: false, mensagem: 'Lista de notícias inválida.' });
    }

    const primeiras10 = noticias.slice(0, 10);

    const resultados = await Promise.all(
        primeiras10.map(async (noticia) => {
            const { titulo, link, fonte } = noticia;

            if (SITES_PAGOS.includes(fonte)) {
                return { titulo, link, fonte, resumo: '🔒 Conteúdo exclusivo para assinantes.' };
            }

            try {
                const texto = await extrairTexto(link);
                const resumo = await resumirComDeepSeek(texto, titulo);
                return { titulo, link, fonte, resumo };
            } catch (erro) {
                console.error(`Erro ao processar "${titulo}":`, erro.message);
                return { titulo, link, fonte, resumo: 'Resumo indisponível para esta notícia.' };
            }
        })
    );

    return res.json({ sucesso: true, resultados });
});

module.exports = router;
