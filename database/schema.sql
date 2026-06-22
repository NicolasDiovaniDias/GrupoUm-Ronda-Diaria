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

CREATE TABLE termo_associado (
    id_termo_associado SERIAL PRIMARY KEY,
    empresa_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,

    CONSTRAINT fk_termo_associado_empresa
        FOREIGN KEY (empresa_id)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

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