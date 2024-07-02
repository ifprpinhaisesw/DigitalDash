DROP DATABASE IF EXISTS eletronico_loja;
CREATE DATABASE IF NOT EXISTS eletronico_loja;
USE eletronico_loja;

CREATE TABLE IF NOT EXISTS produtos(
    id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    preco FLOAT NOT NULL,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario(
    id INT PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    hash VARCHAR(64) NOT NULL,
    compras INT,
    adm BOOL
);

CREATE TABLE IF NOT EXISTS carrinho(
	id_compra INT PRIMARY KEY UNIQUE NOT NULL AUTO_INCREMENT,
	id_produto INT,
    id_usuario INT,
	FOREIGN KEY (id_produto) REFERENCES produtos(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);