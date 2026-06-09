// Importa o Express e cria o roteador das rotas de empresa.
const express = require('express');
const router = express.Router();

// Importa a conexão com o banco MySQL.
const pool = require('../config/db');


// ===============================================
// GET /empresas -> Listar empresas
// ===============================================
router.get('/', async (req, res) => {

    try {

        // Busca empresas cadastradas no banco.
        const [empresas] = await pool.execute(
            `SELECT 
                id_empresa,
                nome,
                bolsa,
                pais,
                ramo,
                criado_em
             FROM empresa
             ORDER BY criado_em DESC`
        );

        // Retorna os dados em JSON.
        res.status(200).json({
            sucesso: true,
            total: empresas.length,
            empresas: empresas
        });

    } catch (erro) {

        console.error('Erro ao listar empresas:', erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar empresas.'
        });
    }
});


// ===============================================
// GET /empresas/:id -> Buscar detalhes da empresa
// ===============================================
router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        // Busca dados principais da empresa.
        const [empresas] = await pool.execute(

            `SELECT
                id_empresa,
                nome,
                bolsa,
                pais,
                ramo,
                criado_em
             FROM empresa
             WHERE id_empresa = ?`,

            [id]
        );

        if (empresas.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: 'Empresa não encontrada.'
            });
        }

        const empresa = empresas[0];

        // Busca nomes associados.
        const [nomes] = await pool.execute(

            `SELECT
                id_nome_associado,
                nome
             FROM nome_associado
             WHERE empresa_id = ?`,

            [id]
        );

        // Busca termos associados.
        const [termos] = await pool.execute(

            `SELECT
                id_termo_associado,
                nome
             FROM termo_associado
             WHERE empresa_id = ?`,

            [id]
        );

        // Busca empresas concorrentes.
        const [concorrentes] = await pool.execute(

            `SELECT
                e.id_empresa,
                e.nome,
                e.bolsa,
                e.pais,
                e.ramo
             FROM empresa_concorrente ec
             INNER JOIN empresa e
                ON e.id_empresa = ec.empresa_rival_id
             WHERE ec.empresa_principal_id = ?`,

            [id]
        );

        res.status(200).json({
            sucesso: true,
            empresa,
            nomes,
            termos,
            concorrentes
        });

    } catch (erro) {

        console.error('Erro ao buscar detalhes da empresa:', erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar detalhes da empresa.'
        });
    }
});


// ===============================================
// POST /empresas -> Cadastrar empresa
// ===============================================
router.post('/', async (req, res) => {

    // Dados enviados pelo frontend.
    const { nome, bolsa, pais, ramo, concorrente, nomes, termos } = req.body;

    // Validação básica.
    if (!nome || nome.trim() === '') {

        return res.status(400).json({
            sucesso: false,
            mensagem: 'O nome da empresa é obrigatório.'
        });
    }

    // Abre conexão com o banco para usar transação.
    const connection = await pool.getConnection();

    try {

        // Inicia transação.
        await connection.beginTransaction();

        // Cadastra empresa principal.
        const [resultadoEmpresa] = await connection.execute(

            `INSERT INTO empresa (nome, bolsa, pais, ramo)
             VALUES (?, ?, ?, ?)`,

            [nome, bolsa || null, pais || null, ramo || null]
        );

        // ID da empresa criada.
        const empresaId = resultadoEmpresa.insertId;


        // ===============================================
        // CONCORRENTE
        // ===============================================

        if (concorrente && concorrente.trim() !== '') {

            const nomeConcorrente = concorrente.trim();

            // Verifica se a concorrente já existe.
            const [concorrentesEncontradas] = await connection.execute(

                `SELECT id_empresa 
                 FROM empresa 
                 WHERE nome = ?
                 LIMIT 1`,

                [nomeConcorrente]
            );

            let concorrenteId;

            // Usa empresa existente ou cria nova.
            if (concorrentesEncontradas.length > 0) {

                concorrenteId = concorrentesEncontradas[0].id_empresa;

            } else {

                const [resultadoConcorrente] = await connection.execute(

                    `INSERT INTO empresa (nome)
                     VALUES (?)`,

                    [nomeConcorrente]
                );

                concorrenteId = resultadoConcorrente.insertId;
            }

            // Evita relacionamento com ela mesma.
            if (concorrenteId !== empresaId) {

                await connection.execute(

                    `INSERT INTO empresa_concorrente 
                    (empresa_principal_id, empresa_rival_id)
                    VALUES (?, ?)`,

                    [empresaId, concorrenteId]
                );
            }
        }


        // ===============================================
        // NOMES ASSOCIADOS
        // ===============================================

        if (Array.isArray(nomes)) {

            for (const nomeAssociado of nomes) {

                if (nomeAssociado.trim() !== '') {

                    await connection.execute(

                        `INSERT INTO nome_associado 
                        (empresa_id, nome)
                        VALUES (?, ?)`,

                        [empresaId, nomeAssociado]
                    );
                }
            }
        }


        // ===============================================
        // TERMOS ASSOCIADOS
        // ===============================================

        if (Array.isArray(termos)) {

            for (const termoAssociado of termos) {

                if (termoAssociado.trim() !== '') {

                    await connection.execute(

                        `INSERT INTO termo_associado 
                        (empresa_id, nome)
                        VALUES (?, ?)`,

                        [empresaId, termoAssociado]
                    );
                }
            }
        }

        // Confirma tudo no banco.
        await connection.commit();

        // Retorna sucesso.
        res.status(201).json({
            sucesso: true,
            mensagem: 'Empresa cadastrada com sucesso.',
            empresaId
        });

    } catch (erro) {

        // Desfaz alterações em caso de erro.
        await connection.rollback();

        console.error('Erro ao cadastrar empresa:', erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao cadastrar empresa.'
        });

    } finally {

        // Libera conexão.
        connection.release();
    }
});


// ===============================================
// PUT /empresas/:id -> Atualizar empresa
// ===============================================
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    const { nome, bolsa, pais, ramo, concorrente, nomes, termos } = req.body;

    console.log(req.body);

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'O nome da empresa é obrigatório.'
        });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Atualiza dados principais da empresa.
        const [resultado] = await connection.execute(
            `UPDATE empresa
             SET nome = ?,
                 bolsa = ?,
                 pais = ?,
                 ramo = ?
             WHERE id_empresa = ?`,
            [
                nome.trim(),
                bolsa || null,
                pais || null,
                ramo || null,
                id
            ]
        );

        if (resultado.affectedRows === 0) {
            await connection.rollback();

            return res.status(404).json({
                sucesso: false,
                mensagem: 'Empresa não encontrada.'
            });
        }

        // Remove nomes antigos.
        await connection.execute(
            `DELETE FROM nome_associado
             WHERE empresa_id = ?`,
            [id]
        );

        // Insere nomes atualizados.
        if (Array.isArray(nomes)) {
            for (const nomeAssociado of nomes) {
                if (nomeAssociado.trim() !== '') {
                    await connection.execute(
                        `INSERT INTO nome_associado (empresa_id, nome)
                         VALUES (?, ?)`,
                        [id, nomeAssociado.trim()]
                    );
                }
            }
        }

        // Remove termos antigos.
        await connection.execute(
            `DELETE FROM termo_associado
             WHERE empresa_id = ?`,
            [id]
        );

        // Insere termos atualizados.
        if (Array.isArray(termos)) {
            for (const termoAssociado of termos) {
                if (termoAssociado.trim() !== '') {
                    await connection.execute(
                        `INSERT INTO termo_associado (empresa_id, nome)
                         VALUES (?, ?)`,
                        [id, termoAssociado.trim()]
                    );
                }
            }
        }

        // Remove concorrente antigo.
        await connection.execute(
            `DELETE FROM empresa_concorrente
             WHERE empresa_principal_id = ?`,
            [id]
        );

        // Insere concorrente atualizado.
        if (concorrente && concorrente.trim() !== '') {
            const nomeConcorrente = concorrente.trim();

            const [concorrentesEncontradas] = await connection.execute(
                `SELECT id_empresa
                 FROM empresa
                 WHERE nome = ?
                 LIMIT 1`,
                [nomeConcorrente]
            );

            let concorrenteId;

            if (concorrentesEncontradas.length > 0) {
                concorrenteId = concorrentesEncontradas[0].id_empresa;
            } else {
                const [resultadoConcorrente] = await connection.execute(
                    `INSERT INTO empresa (nome)
                     VALUES (?)`,
                    [nomeConcorrente]
                );

                concorrenteId = resultadoConcorrente.insertId;
            }

            if (Number(concorrenteId) !== Number(id)) {
                await connection.execute(
                    `INSERT INTO empresa_concorrente (empresa_principal_id, empresa_rival_id)
                     VALUES (?, ?)`,
                    [id, concorrenteId]
                );
            }
        }

        await connection.commit();

        res.status(200).json({
            sucesso: true,
            mensagem: 'Empresa atualizada com sucesso.'
        });

    } catch (erro) {
        await connection.rollback();

        console.error('Erro ao atualizar empresa:', erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar empresa.'
        });

    } finally {
        connection.release();
    }
});


// ===============================================
// DELETE /empresas/:id -> Excluir empresa
// ===============================================
router.delete('/:id', async (req, res) => {

    // Recupera o ID enviado na URL.
    const { id } = req.params;

    try {

        // Exclui a empresa.
        const [resultado] = await pool.execute(

            `DELETE FROM empresa
             WHERE id_empresa = ?`,

            [id]
        );

        // Verifica se encontrou a empresa.
        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: 'Empresa não encontrada.'
            });
        }

        // Retorna sucesso.
        res.status(200).json({
            sucesso: true,
            mensagem: 'Empresa excluída com sucesso.'
        });

    } catch (erro) {

        console.error('Erro ao excluir empresa:', erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao excluir empresa.'
        });
    }
});


// Exporta as rotas.
module.exports = router;