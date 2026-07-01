const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const axios = require('axios');

router.post('/', async (req, res) => {
    const { empresaId } = req.body;
    let client;

    try {
        client = await pool.connect();
        
        let queryNews = `
            SELECT ns.titulo, ns.resumo, ns.sentimento, ns.data_noticia, e.nome as empresa_nome, e.ramo
            FROM noticia_salva ns
            LEFT JOIN empresa e ON ns.empresa_id = e.id_empresa
        `;
        let queryParams = [];

        if (empresaId && empresaId !== 'all') {
            queryNews += ` WHERE ns.empresa_id = $1`;
            queryParams.push(Number(empresaId));
        }

        queryNews += ` ORDER BY ns.data_salvamento DESC LIMIT 15`;

        const newsResult = await client.query(queryNews, queryParams);
        const noticias = newsResult.rows;

        if (noticias.length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Não há notícias salvas suficientes para gerar um relatório sobre esta empresa.'
            });
        }

        const nomeEmpresa = empresaId && empresaId !== 'all' ? noticias[0].empresa_nome : 'Todas as Empresas Monitoradas';
        const ramoEmpresa = empresaId && empresaId !== 'all' ? (noticias[0].ramo || 'Setor não informado') : 'Múltiplos Setores';

        // Contagem de sentimentos
        const total = noticias.length;
        const positivos = noticias.filter(n => n.sentimento === 'positivo').length;
        const neutros = noticias.filter(n => n.sentimento === 'neutro').length;
        const negativos = noticias.filter(n => n.sentimento === 'negativo').length;

        // Montar a lista de notícias para o prompt
        const noticiasTexto = noticias.map((n, i) => {
            return `Notícia ${i + 1}:
- Título: "${n.titulo}"
- Resumo preliminar: "${n.resumo}"
- Sentimento: ${n.sentimento}`;
        }).join('\n\n');

        const prompt = `Você é um analista financeiro sênior e especialista em reputação de mercado de capitais.
Gere um Relatório de Inteligência Executiva de Mercado estruturado exclusivamente em HTML limpo (retorne apenas as tags HTML internas como <h3>, <p>, <ul>, <li>, <strong>, etc., sem as tags <html>, <head> ou <body> e sem blocos de código de markdown como \`\`\`html).

Dados Básicos do Escopo:
- Empresa Analisada: ${nomeEmpresa}
- Setor de Atuação: ${ramoEmpresa}
- Total de Notícias Monitoradas: ${total}
- Distribuição de Sentimento: ${positivos} Positivas, ${neutros} Neutras, ${negativos} Negativas.

Últimas Notícias Coletadas:
${noticiasTexto}

Estruture o relatório em HTML com os seguintes tópicos:
1. <h3>Sumário Executivo</h3>: Análise concisa e fundamentada sobre a percepção recente da empresa na mídia.
2. <h3>Análise Quantitativa de Sentimento</h3>: Discussão analítica sobre a proporção de sentimentos (positivos, neutros e negativos) e o impacto dessa percepção na imagem institucional.
3. <h3>Pontos de Destaque</h3>: Uma lista em tópicos (<ul> e <li>) com os principais fatos e acontecimentos relatados no clipping de notícias recente.
4. <h3>Riscos e Oportunidades</h3>: Conselhos estratégicos de posicionamento no mercado ou alertas de reputação com base nas ameaças ou notícias positivas capturadas.`;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Chave de API do Gemini não configurada no servidor.'
            });
        }

        const apiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.2
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 15000
            }
        );

        let reportHtml = apiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        // Limpar blocos de markdown ```html caso o Gemini adicione por engano
        if (reportHtml) {
            reportHtml = reportHtml.replace(/```html/g, '').replace(/```/g, '').trim();
        }

        res.json({
            sucesso: true,
            html: reportHtml,
            empresa: nomeEmpresa
        });

    } catch (erro) {
        console.error('Erro ao gerar relatório com IA:', erro);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao processar e gerar o relatório com a IA do Gemini.'
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

module.exports = router;
