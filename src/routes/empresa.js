const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT
                e.id_empresa,
                e.nome,
                e.bolsa,
                e.pais,
                e.ramo,
                COALESCE((
                    SELECT string_agg(na.nome, ', ')
                    FROM nome_associado na
                    WHERE na.empresa_id = e.id_empresa
                ), '') AS nomes,
                COALESCE((
                    SELECT string_agg(ta.nome, ', ')
                    FROM termo_associado ta
                    WHERE ta.empresa_id = e.id_empresa
                ), '') AS termos,
                COALESCE((
                    SELECT string_agg(nome, ', ')
                    FROM (
                        SELECT ec2.nome
                        FROM empresa_concorrente ec
                        JOIN empresa ec2 ON ec.empresa_rival_id = ec2.id_empresa
                        WHERE ec.empresa_principal_id = e.id_empresa

                        UNION ALL

                        SELECT ca.nome
                        FROM concorrente_associado ca
                        WHERE ca.empresa_id = e.id_empresa
                    ) concorrentes_union
                ), '') AS concorrentes
            FROM empresa e
            ORDER BY e.id_empresa DESC
            LIMIT 50
        `);

        res.json(result.rows);
    } catch (erro) {
        console.error('Erro ao listar empresas:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar empresas.' });
    } finally {
        client.release();
    }
});

router.delete('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id);

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'ID da empresa inválido.'
        });
    }

    const client = await pool.connect();

    try {
        const result = await client.query(
            'DELETE FROM empresa WHERE id_empresa = $1',
            [idEmpresa]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Empresa não encontrada.'
            });
        }

        res.json({
            sucesso: true,
            mensagem: 'Empresa removida com sucesso.'
        });
    } catch (erro) {
        console.error('Erro ao deletar empresa:', erro);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao deletar empresa.'
        });
    } finally {
        client.release();
    }
});

router.post('/', async (req, res) => {
    const { nome, bolsa, pais, ramo, concorrente, nomes, termos } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'O nome da empresa é obrigatório.'
        });
    }

    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const insertEmpresa = await client.query(
            `INSERT INTO empresa (nome, bolsa, pais, ramo)
             VALUES ($1, $2, $3, $4)
             RETURNING id_empresa`,
            [nome, bolsa || null, pais || null, ramo || null]
        );

        const empresaId = insertEmpresa.rows[0].id_empresa;

        if (concorrente && concorrente.trim() !== '') {
            const nomeConcorrente = concorrente.trim();

            const concorrenteSelect = await client.query(
                `SELECT id_empresa FROM empresa WHERE nome = $1 LIMIT 1`,
                [nomeConcorrente]
            );

            if (concorrenteSelect.rows.length > 0) {
                const concorrenteId = concorrenteSelect.rows[0].id_empresa;

                if (concorrenteId !== empresaId) {
                    await client.query(
                        `INSERT INTO empresa_concorrente (empresa_principal_id, empresa_rival_id)
                         VALUES ($1, $2)`,
                        [empresaId, concorrenteId]
                    );
                }
            } else {
                await client.query(
                    `INSERT INTO concorrente_associado (empresa_id, nome)
                     VALUES ($1, $2)`,
                    [empresaId, nomeConcorrente]
                );
            }
        }

        if (Array.isArray(nomes)) {
            for (const nomeAssociado of nomes) {
                if (String(nomeAssociado).trim() !== '') {
                    await client.query(
                        `INSERT INTO nome_associado (empresa_id, nome)
                         VALUES ($1, $2)`,
                        [empresaId, nomeAssociado]
                    );
                }
            }
        }

        if (Array.isArray(termos)) {
            for (const termoAssociado of termos) {
                if (String(termoAssociado).trim() !== '') {
                    await client.query(
                        `INSERT INTO termo_associado (empresa_id, nome)
                         VALUES ($1, $2)`,
                        [empresaId, termoAssociado]
                    );
                }
            }
        }

        await client.query('COMMIT');

        return res.status(201).json({
            sucesso: true,
            mensagem: 'Empresa cadastrada com sucesso.',
            empresaId
        });

    } catch (erro) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErro) {
                console.error('Erro ao fazer rollback:', rollbackErro);
            }
        }

        console.error('Erro ao cadastrar empresa:', erro);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao cadastrar empresa.'
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

router.put('/:id', async (req, res) => {
    const idEmpresa = Number(req.params.id);
    const { nome, bolsa, pais, ramo, concorrente, nomes, termos } = req.body;

    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'ID da empresa inválido.'
        });
    }

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'O nome da empresa é obrigatório.'
        });
    }

    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // 1. Atualizar dados básicos da empresa
        const updateResult = await client.query(
            `UPDATE empresa 
             SET nome = $1, bolsa = $2, pais = $3, ramo = $4
             WHERE id_empresa = $5`,
            [nome.trim(), bolsa || null, pais || null, ramo || null, idEmpresa]
        );

        if (updateResult.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Empresa não encontrada.'
            });
        }

        // 2. Limpar associações antigas
        await client.query('DELETE FROM nome_associado WHERE empresa_id = $1', [idEmpresa]);
        await client.query('DELETE FROM termo_associado WHERE empresa_id = $1', [idEmpresa]);
        await client.query('DELETE FROM concorrente_associado WHERE empresa_id = $1', [idEmpresa]);
        await client.query('DELETE FROM empresa_concorrente WHERE empresa_principal_id = $1', [idEmpresa]);

        // 3. Inserir concorrente associado ou cadastrado
        if (concorrente && concorrente.trim() !== '') {
            const nomeConcorrente = concorrente.trim();

            const concorrenteSelect = await client.query(
                `SELECT id_empresa FROM empresa WHERE nome = $1 LIMIT 1`,
                [nomeConcorrente]
            );

            if (concorrenteSelect.rows.length > 0) {
                const concorrenteId = concorrenteSelect.rows[0].id_empresa;

                if (concorrenteId !== idEmpresa) {
                    await client.query(
                        `INSERT INTO empresa_concorrente (empresa_principal_id, empresa_rival_id)
                         VALUES ($1, $2)`,
                        [idEmpresa, concorrenteId]
                    );
                }
            } else {
                await client.query(
                    `INSERT INTO concorrente_associado (empresa_id, nome)
                     VALUES ($1, $2)`,
                    [idEmpresa, nomeConcorrente]
                );
            }
        }

        // 4. Inserir novas variações de nomes
        if (Array.isArray(nomes)) {
            for (const nomeAssociado of nomes) {
                if (String(nomeAssociado).trim() !== '') {
                    await client.query(
                        `INSERT INTO nome_associado (empresa_id, nome)
                         VALUES ($1, $2)`,
                        [idEmpresa, nomeAssociado.trim()]
                    );
                }
            }
        }

        // 5. Inserir novos termos de busca
        if (Array.isArray(termos)) {
            for (const termoAssociado of termos) {
                if (String(termoAssociado).trim() !== '') {
                    await client.query(
                        `INSERT INTO termo_associado (empresa_id, nome)
                         VALUES ($1, $2)`,
                        [idEmpresa, termoAssociado.trim()]
                    );
                }
            }
        }

        await client.query('COMMIT');

        return res.json({
            sucesso: true,
            mensagem: 'Empresa atualizada com sucesso.'
        });

    } catch (erro) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (rollbackErro) {
                console.error('Erro ao fazer rollback:', rollbackErro);
            }
        }

        console.error('Erro ao atualizar empresa:', erro);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar empresa.'
        });
    } finally {
        if (client) {
            client.release();
        }
    }
});

router.get('/:id/acoes', async (req, res) => {
    const id = Number(req.params.id);
    let client;

    try {
        client = await pool.connect();
        
        // 1. Verificar se a empresa existe
        const empresaRes = await client.query('SELECT nome, bolsa FROM empresa WHERE id_empresa = $1 LIMIT 1', [id]);
        if (empresaRes.rows.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: 'Empresa não encontrada.' });
        }

        const empresa = empresaRes.rows[0];
        const nome = empresa.nome;
        const bolsa = empresa.bolsa || 'TICKER';

        // 2. Buscar as notícias salvas da empresa nos últimos 14 dias
        const noticiasRes = await client.query(`
            SELECT sentimento, data_salvamento::date as data_dia
            FROM noticia_salva
            WHERE empresa_id = $1 AND data_salvamento >= NOW() - INTERVAL '14 days'
        `, [id]);
        const noticias = noticiasRes.rows;

        // Agrupar notícias por data (YYYY-MM-DD)
        const noticiasPorDia = {};
        noticias.forEach(n => {
            if (!n.data_dia) return;
            const diaStr = new Date(n.data_dia).toISOString().split('T')[0];
            if (!noticiasPorDia[diaStr]) {
                noticiasPorDia[diaStr] = [];
            }
            noticiasPorDia[diaStr].push(n.sentimento);
        });

        // 3. Gerar histórico de 14 dias (de D-13 até D-0)
        const historico = [];
        let precoBase = 50.0;
        
        // Ajustar preço base de acordo com ações reais famosas
        const bolsaUpper = bolsa.toUpperCase();
        if (bolsaUpper.includes('AAPL')) precoBase = 180.0;
        else if (bolsaUpper.includes('LREN')) precoBase = 16.5;
        else if (bolsaUpper.includes('NVDA')) precoBase = 120.0;
        else if (bolsaUpper.includes('PETR')) precoBase = 36.0;
        else if (bolsaUpper.includes('VALE')) precoBase = 62.0;

        let precoAtual = precoBase;

        for (let i = 13; i >= 0; i--) {
            const dataAux = new Date();
            dataAux.setDate(dataAux.getDate() - i);
            const diaStr = dataAux.toISOString().split('T')[0];

            // Obter sentimentos do dia
            const sentimentosDia = noticiasPorDia[diaStr] || [];
            const pos = sentimentosDia.filter(s => s === 'positivo').length;
            const neg = sentimentosDia.filter(s => s === 'negativo').length;

            // Calcular variação percentual
            // Deriva aleatória natural entre -0.4% e +0.4%
            let variacao = (Math.random() * 0.8 - 0.4); 

            // Se houver notícias negativas, cai
            if (neg > 0) {
                variacao -= (neg * (Math.random() * 1.5 + 0.5)); // queda de 0.5% a 2% por notícia negativa
            }
            // Se houver notícias positivas, sobe
            if (pos > 0) {
                variacao += (pos * (Math.random() * 1.2 + 0.3)); // alta de 0.3% a 1.5% por notícia positiva
            }

            // Limitar a variação diária para ficar realista (-8% a +8%)
            variacao = Math.max(-8, Math.min(8, variacao));

            const precoAnterior = precoAtual;
            precoAtual = precoAnterior * (1 + variacao / 100);

            // Determinar o sentimento predominante do dia
            let sentDia = 'neutro';
            if (pos > neg) sentDia = 'positivo';
            else if (neg > pos) sentDia = 'negativo';

            historico.push({
                data: diaStr,
                preco: Number(precoAtual.toFixed(2)),
                variacao: Number(variacao.toFixed(2)),
                positivas: pos,
                negativas: neg,
                sentimento_predominante: sentDia
            });
        }

        res.json({
            sucesso: true,
            empresa: nome,
            bolsa: bolsa,
            historico: historico
        });

    } catch (erro) {
        console.error('Erro ao gerar cotações correlacionadas:', erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao processar cotações.' });
    } finally {
        if (client) {
            client.release();
        }
    }
});

module.exports = router;