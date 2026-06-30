const { Worker } = require('bullmq');
const pool = require('../config/db');
const { extrairTexto, analisarComGemini } = require('../routes/resumo');

const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379)
};

const worker = new Worker('noticiasQueue', async (job) => {
    const { idNoticia, link, titulo } = job.data;
    console.log(`[Worker] Iniciando análise em background para a notícia ID ${idNoticia}: "${titulo}"`);

    let resumoFinal = 'Resumo indisponível para esta notícia.';
    let sentimentoFinal = 'neutro';

    try {
        if (process.env.GEMINI_API_KEY) {
            const textoCompleto = await extrairTexto(link);
            if (textoCompleto && textoCompleto.length > 100) {
                const analise = await analisarComGemini(textoCompleto, titulo);
                resumoFinal = analise.resumo;
                sentimentoFinal = analise.sentimento;
            } else {
                console.log(`[Worker] Texto extraído muito curto (${textoCompleto ? textoCompleto.length : 0} caracteres). Mantendo resumo original.`);
                return;
            }
        } else {
            console.log(`[Worker] Chave GEMINI_API_KEY não configurada. Background processing suspenso.`);
            return;
        }
    } catch (erroAI) {
        console.error(`[Worker] Erro de raspagem ou IA do Gemini para notícia ID ${idNoticia}:`, erroAI.message);
        // Não atualiza no banco caso falhe, para preservar o snippet original como fallback
        return;
    }

    let client;
    try {
        client = await pool.connect();
        await client.query(
            `UPDATE noticia_salva 
             SET resumo = $1, sentimento = $2
             WHERE id_noticia_salva = $3`,
            [resumoFinal, sentimentoFinal, idNoticia]
        );
        console.log(`[Worker] Sucesso! Notícia ID ${idNoticia} enriquecida com o resumo do Gemini. Sentimento: ${sentimentoFinal.toUpperCase()}`);
    } catch (erroDB) {
        console.error(`[Worker] Erro ao atualizar notícia ID ${idNoticia} no banco de dados:`, erroDB.message);
    } finally {
        if (client) {
            client.release();
        }
    }
}, { connection });

worker.on('failed', (job, err) => {
    if (job) {
        console.error(`[Worker] Job ${job.id} (notícia ${job.data.idNoticia}) falhou:`, err.message);
    } else {
        console.error(`[Worker] Um job falhou:`, err.message);
    }
});

console.log(`Worker do BullMQ iniciado e escutando a fila 'noticiasQueue' em ${connection.host}:${connection.port}`);

module.exports = worker;
