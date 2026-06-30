-- CREATE DATABASE ronda_diaria
-- CHARACTER SET utf8mb4
-- COLLATE utf8mb4_unicode_ci;

-- USE ronda_diaria;

CREATE TABLE empresa (
    id_empresa SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    bolsa VARCHAR(100),
    pais VARCHAR(100),
    ramo VARCHAR(150),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nome_associado (
    id_nome_associado SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL,
    nome VARCHAR(150) NOT NULL,

    CONSTRAINT fk_nome_associado_empresa
        FOREIGN KEY (empresa_id)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

ALTER TABLE nome_associado
    ADD CONSTRAINT uq_nome_associado_empresa_nome
    UNIQUE (empresa_id, nome);

CREATE TABLE termo_associado (
    id_termo_associado SERIAL PRIMARY KEY,
    empresa_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,

    CONSTRAINT fk_termo_associado_empresa
        FOREIGN KEY (empresa_id)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

ALTER TABLE termo_associado
    ADD CONSTRAINT uq_termo_associado_empresa_nome
    UNIQUE (empresa_id, nome);

CREATE TABLE empresa_concorrente (
    id_empresa_concorrente SERIAL PRIMARY KEY,
    empresa_principal_id INTEGER NOT NULL,
    empresa_rival_id INTEGER NOT NULL,
    
     CONSTRAINT fk_empresa_principal
        FOREIGN KEY (empresa_principal_id)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE,

    CONSTRAINT fk_empresa_rival
        FOREIGN KEY (empresa_rival_id)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

ALTER TABLE empresa_concorrente
    ADD CONSTRAINT uq_empresa_concorrente_par
    UNIQUE (empresa_principal_id, empresa_rival_id);

CREATE TABLE concorrente_associado (
    id_concorrente_associado SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL,
    nome VARCHAR(150) NOT NULL,

    CONSTRAINT fk_concorrente_associado_empresa
        FOREIGN KEY (empresa_id)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

ALTER TABLE concorrente_associado
    ADD CONSTRAINT uq_concorrente_associado_empresa_nome
    UNIQUE (empresa_id, nome);

CREATE TABLE noticia_salva (
    id_noticia_salva SERIAL PRIMARY KEY,
    empresa_id INTEGER,
    empresa_nome VARCHAR(150),
    titulo TEXT NOT NULL,
    link TEXT NOT NULL,
    resumo TEXT,
    data_noticia VARCHAR(100),
    imagem TEXT,
    sentimento VARCHAR(20) DEFAULT 'neutro' CHECK (sentimento IN ('positivo', 'neutro', 'negativo')),
    data_salvamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_noticia_salva_empresa
        FOREIGN KEY (empresa_id)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);