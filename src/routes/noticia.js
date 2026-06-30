const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { extrairTexto, analisarComGemini } = require('./resumo');
const noticiaQueue = require('../queues/noticiaQueue');

router.get('/', async (req, res) => {
    let client;

    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT
                id_noticia_salva,
                empresa_id,
                empresa_nome,
                titulo,
                link,
                resumo,
                data_noticia,
                imagem,
                sentimento,
                data_salvamento
            FROM noticia_salva
            ORDER BY id_noticia_salva DESC
        `);

        return res.json(result.rows);
    } catch (erro) {
        console.error('Erro ao listar notícias salvas:', erro);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar notícias salvas.'
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

router.post('/', async (req, res) => {
    const { empresaId, empresaNome, titulo, link, resumo, data, imagem, sentimento } = req.body;
    const nomeEmpresa = typeof empresaNome === 'string' ? empresaNome.trim() : '';
    const tituloNoticia = typeof titulo === 'string' ? titulo.trim() : '';
    const linkNoticia = typeof link === 'string' ? link.trim() : '';
    const resumoNoticia = typeof resumo === 'string' ? resumo.trim() : '';
    const dataNoticia = typeof data === 'string' ? data.trim() : '';
    const imagemNoticia = typeof imagem === 'string' ? imagem.trim() : '';
    const sentimentoNoticia = typeof sentimento === 'string' ? sentimento.trim() : 'neutro';
    const sentimentoFinal = ['positivo', 'neutro', 'negativo'].includes(sentimentoNoticia) ? sentimentoNoticia : 'neutro';

    if (!empresaId && !nomeEmpresa) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Empresa é obrigatória.'
        });
    }

    if (!tituloNoticia || !linkNoticia) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Título e link são obrigatórios.'
        });
    }

    let client;

    try {
        client = await pool.connect();

        let empresaIdFinal = null;

        if (empresaId !== undefined && empresaId !== null && empresaId !== '') {
            const idNumerico = Number(empresaId);

            if (Number.isInteger(idNumerico) && idNumerico > 0) {
                const empresaResult = await client.query('SELECT id_empresa FROM empresa WHERE id_empresa = $1 LIMIT 1', [idNumerico]);
                empresaIdFinal = empresaResult.rows[0]?.id_empresa || null;
            }
        }

        if (!empresaIdFinal && nomeEmpresa) {
            const empresaResult = await client.query('SELECT id_empresa FROM empresa WHERE nome = $1 LIMIT 1', [nomeEmpresa]);
            empresaIdFinal = empresaResult.rows[0]?.id_empresa || null;
        }

        // Insere de imediato com o snippet original obtido da busca e o sentimento 'neutro' padrão
        const insertResult = await client.query(
            `INSERT INTO noticia_salva (empresa_id, empresa_nome, titulo, link, resumo, data_noticia, imagem, sentimento, data_salvamento)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING id_noticia_salva`,
            [empresaIdFinal, nomeEmpresa || null, tituloNoticia, linkNoticia, resumoNoticia || null, dataNoticia || null, imagemNoticia || null, 'neutro']
        );
        const idNoticia = insertResult.rows[0].id_noticia_salva;

        // Se a chave do Gemini estiver configurada, adiciona à fila de background para enriquecer a notícia
        if (process.env.GEMINI_API_KEY) {
            await noticiaQueue.add('analisarNoticia', {
                idNoticia,
                link: linkNoticia,
                titulo: tituloNoticia
            });
            console.log(`[Queue] Notícia ID ${idNoticia} enfileirada no BullMQ.`);
        }

        return res.status(201).json({
            sucesso: true,
            mensagem: 'Notícia salva e enviada para processamento de IA em background.',
            idNoticia
        });
    } catch (erro) {
        console.error('Erro ao salvar notícia:', erro);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao salvar notícia.'
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

module.exports = router;
