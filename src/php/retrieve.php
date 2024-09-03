<?php
    // Estabelece a conexão com o banco de dados
    $conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

    // Executa a consulta para obter todos os produtos
    $result = mysqli_query($conexao, "SELECT * FROM produtos");

    // Inicializa um array para armazenar os produtos
    $produtos = array();

    // Itera sobre os resultados da consulta e adiciona cada produto ao array
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($produtos, $row);
    }

    // Converte o array de produtos para formato JSON
    $json = json_encode($produtos);

    // Retorna o JSON
    echo $json;
?>
