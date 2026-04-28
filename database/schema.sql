CREATE DATABASE ronda_diaria
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ronda_diaria;

CREATE TABLE empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    bolsa VARCHAR(100),
    pais VARCHAR(100),
    ramo VARCHAR(150),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nome_associado (
    id_nome_associado INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

CREATE TABLE termo_associado (
    id_termo_associado INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

CREATE TABLE empresa_concorrente (
    id_empresa_concorrente INT AUTO_INCREMENT PRIMARY KEY,
    empresa_principal_id INT NOT NULL,
    empresa_rival_id INT NOT NULL,
    FOREIGN KEY (empresa_principal_id) REFERENCES empresa(id_empresa)
        ON DELETE CASCADE,
    FOREIGN KEY (empresa_rival_id) REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);