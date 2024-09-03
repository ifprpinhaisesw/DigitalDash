<?php

// Recupera os dados do formulário HTML via método POST
$nome = $_POST['nome'];
$email = $_POST['email'];
$hash = $_POST['senha'];

// Estabelece a conexão com o banco de dados
$conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

// Monta a consulta SQL para inserir os dados na tabela "usuario"
$query = "INSERT INTO usuario (nome, email, hash, adm) VALUES ('$nome', '$email', '$hash', 0)";

// Executa a consulta no banco de dados
mysqli_query($conexao, $query);

?>
