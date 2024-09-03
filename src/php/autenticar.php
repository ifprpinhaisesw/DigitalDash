<?php

// Estabelece a conexão com o banco de dados
$conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

// Define a consulta SQL para selecionar todos os registros da tabela "usuario"
$query = "SELECT * FROM usuario";

// Executa a consulta no banco de dados
$resultado = mysqli_query($conexao, $query);

// Array para armazenar os resultados da consulta
$usuarios = array();

// Itera sobre os resultados e os armazena no array $usuarios
while ($ler = mysqli_fetch_assoc($resultado)){
    array_push($usuarios, $ler);
};

// Converte o array $usuarios para o formato JSON
$json = json_encode($usuarios);

// Imprime o JSON resultante
echo $json;

?>
