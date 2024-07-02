<?php
session_start();

// Estabelece a conexão com o banco de dados
$conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

// Executa a consulta SQL para recuperar os produtos no carrinho do usuário
$resultado = mysqli_query($conexao, "
    SELECT * FROM carrinho 
    JOIN produtos ON produtos.id = carrinho.id_produto
    WHERE carrinho.id_usuario = {$_SESSION['id']}
");

// Inicializa um array para armazenar os resultados
$produtos_finais = array();

// Itera sobre os resultados e adiciona ao array
while ($ler = mysqli_fetch_assoc($resultado)){
    array_push($produtos_finais, $ler);
}

// Converte o array em formato JSON
$json = json_encode($produtos_finais);

// Envia a resposta JSON
echo $json;
?>
