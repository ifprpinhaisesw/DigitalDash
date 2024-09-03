<?php

// Obtém o nome do produto a ser excluído da requisição POST
$selecionado = $_POST['selecionado'];

// Estabelece a conexão com o banco de dados
$conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

// Exclui os itens relacionados ao produto da tabela 'carrinho'
mysqli_query($conexao, "DELETE FROM carrinho WHERE id_produto = (SELECT id FROM produtos WHERE nome = '$selecionado')");

// Exclui o produto da tabela 'produtos'
$query = "DELETE FROM produtos WHERE nome='$selecionado'";
mysqli_query($conexao, $query);

// Obtém o ID do produto excluído
$id = mysqli_insert_id($conexao);

// Exclui o arquivo de imagem associado ao produto
unlink('../img/'.$id.'.png');

?>
