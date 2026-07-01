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

async function analisarComGemini(texto, titulo) {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            contents: [
                {
                    parts: [
                        {
                            text: `Analise a seguinte notícia de forma detalhada e retorne o resultado em JSON estruturado de acordo com as especificações.

Título da notícia: "${titulo}"
Conteúdo da notícia:
${texto}

Instruções adicionais:
1. Resuma a notícia de forma curta e objetiva (no máximo 3 linhas) em português.
2. Analise o sentimento geral (positivo, neutro ou negativo) em relação à empresa do contexto.
3. Avalie o "sensacionalismo" (porcentagem de 0 a 100): títulos clickbait, exagerados ou apelativos devem ter pontuação alta. Títulos factuais e objetivos devem ter pontuação baixa.
4. Avalie a "confiabilidade" (porcentagem de 0 a 100): conteúdos com coerência factual, fontes citadas e argumentos lógicos devem ter pontuação alta. Boataria ou acusações sem provas devem pontuar baixo.
5. Forneça uma breve justificativa em português ("analise_fato") com até 2 frases sobre os critérios usados para as pontuações de sensacionalismo e confiabilidade.`
                        }
                    ]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        resumo: {
                            type: "STRING",
                            description: "Resumo curto e objetivo em português com no máximo 3 linhas."
                        },
                        sentimento: {
                            type: "STRING",
                            enum: ["positivo", "neutro", "negativo"],
                            description: "Sentimento geral da notícia em relação à empresa."
                        },
                        sensacionalismo: {
                            type: "INTEGER",
                            description: "Nota de 0 a 100 para sensacionalismo e apelo a cliques no título e texto."
                        },
                        confiabilidade: {
                            type: "INTEGER",
                            description: "Nota de 0 a 100 para a credibilidade e base factual do texto."
                        },
                        analise_fato: {
                            type: "STRING",
                            description: "Justificativa curta das notas em português."
                        }
                    },
                    required: ["resumo", "sentimento", "sensacionalismo", "confiabilidade", "analise_fato"]
                }
            }
        },
        {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        }
    );

    const jsonString = response.data.candidates[0].content.parts[0].text;
    const result = JSON.parse(jsonString);
    return {
        resumo: result.resumo,
        sentimento: result.sentimento,
        sensacionalismo: Number(result.sensacionalismo || 0),
        confiabilidade: Number(result.confiabilidade || 100),
        analise_fato: result.analise_fato || ''
    };
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
                return { titulo, link, fonte, resumo: '🔒 Conteúdo exclusivo para assinantes.', sentimento: 'neutro' };
            }

            try {
                const texto = await extrairTexto(link);

                if (process.env.GEMINI_API_KEY) {
                    const resultGemini = await analisarComGemini(texto, titulo);
                    return { titulo, link, fonte, resumo: resultGemini.resumo, sentimento: resultGemini.sentimento };
                } else if (process.env.DEEPSEEK_API_KEY) {
                    const resumo = await resumirComDeepSeek(texto, titulo);
                    return { titulo, link, fonte, resumo, sentimento: 'neutro' };
                } else {
                    return { titulo, link, fonte, resumo: 'Resumo indisponível (Chaves de API não configuradas).', sentimento: 'neutro' };
                }
            } catch (erro) {
                console.error(`Erro ao processar "${titulo}":`, erro.message);
                return { titulo, link, fonte, resumo: 'Resumo indisponível para esta notícia.', sentimento: 'neutro' };
            }
        })
    );

    return res.json({ sucesso: true, resultados });
});

router.extrairTexto = extrairTexto;
router.analisarComGemini = analisarComGemini;

module.exports = router;
