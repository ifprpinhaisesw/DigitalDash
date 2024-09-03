<?php

session_start();

// Estabelece a conexão com o banco de dados
$conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

// Obtém o número de compras e o ID do usuário da requisição POST
$compras = $_POST['compras'];
$id = $_SESSION['id'];

// Consulta SQL para obter o número atual de compras do usuário
$query = "SELECT compras FROM usuario WHERE id = '$id'";
$result = mysqli_query($conexao, $query);

// Verifica se a consulta foi bem-sucedida
if ($result) {
    // Obtém o resultado da consulta como um array associativo
    $row = mysqli_fetch_assoc($result);

    // Obtém o número atual de compras do usuário
    $compras_atual = $row['compras'];

    // Calcula o novo total de compras
    $novo_total_compras = $compras_atual + $compras;

    // Atualiza o número total de compras do usuário na tabela 'usuario'
    $update_query = "UPDATE usuario SET compras = '$novo_total_compras' WHERE id = '$id'";
    mysqli_query($conexao, $update_query);
}

// Limpa os itens do carrinho na tabela 'carrinho' para o usuário atual
$query_carrinho = "DELETE FROM carrinho WHERE id_usuario = '$id'";
mysqli_query($conexao, $query_carrinho);

?>
