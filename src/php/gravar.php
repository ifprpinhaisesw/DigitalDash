<?php

// Obtém os dados do produto da requisição POST
$nome = $_POST['nome'];
$preco = $_POST['preco'];
$arquivo = $_FILES['arquivo'];

// Estabelece a conexão com o banco de dados
$conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

// Verifica se o arquivo é uma imagem PNG ou JPEG
if ($arquivo['type'] == 'image/png' || $arquivo['type'] == 'image/jpeg') {

    // Insere o novo produto na tabela 'produtos'
    $query = "INSERT INTO produtos (nome, preco) VALUES ('$nome', '$preco')";
    mysqli_query($conexao, $query);

    // Obtém o ID do produto recém-inserido
    $id = mysqli_insert_id($conexao);

    // Move o arquivo de imagem para o diretório de imagens
    move_uploaded_file($arquivo['tmp_name'], '../img/'.$id.'.png');

} else {
    // Se o arquivo não for uma imagem PNG ou JPEG, emite uma mensagem de erro
    echo 'Erro: O arquivo precisa ser uma imagem (tipo PNG ou JPEG)';
}

?>
