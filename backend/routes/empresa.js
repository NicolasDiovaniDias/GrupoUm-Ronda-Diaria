const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { nome, bolsa, pais, ramo, concorrente, nomes, termos } = req.body;

    console.log('Dados recebidos:', req.body);
    console.log('Concorrente recebida:', concorrente);

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'O nome da empresa é obrigatório.'
        });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [resultadoEmpresa] = await connection.execute(
            `INSERT INTO empresa (nome, bolsa, pais, ramo)
             VALUES (?, ?, ?, ?)`,
            [nome, bolsa || null, pais || null, ramo || null]
        );

        const empresaId = resultadoEmpresa.insertId;

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

            if (concorrenteId !== empresaId) {
                await connection.execute(
                    `INSERT INTO empresa_concorrente (empresa_principal_id, empresa_rival_id)
                    VALUES (?, ?)`,
                    [empresaId, concorrenteId]
                );
            }
        }

        if (Array.isArray(nomes)) {
            for (const nomeAssociado of nomes) {
                if (nomeAssociado.trim() !== '') {
                    await connection.execute(
                        `INSERT INTO nome_associado (empresa_id, nome)
                         VALUES (?, ?)`,
                        [empresaId, nomeAssociado]
                    );
                }
            }
        }

        if (Array.isArray(termos)) {
            for (const termoAssociado of termos) {
                if (termoAssociado.trim() !== '') {
                    await connection.execute(
                        `INSERT INTO termo_associado (empresa_id, nome)
                         VALUES (?, ?)`,
                        [empresaId, termoAssociado]
                    );
                }
            }
        }

        await connection.commit();

        res.status(201).json({
            sucesso: true,
            mensagem: 'Empresa cadastrada com sucesso.',
            empresaId
        });

    } catch (erro) {
        await connection.rollback();

        console.error('Erro ao cadastrar empresa:', erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao cadastrar empresa.'
        });

    } finally {
        connection.release();
    }
});

module.exports = router;