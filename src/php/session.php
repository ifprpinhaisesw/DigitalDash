<?php
    // Obtém o email do formulário POST
    $email = $_POST['email'];

    // Inicia ou retoma a sessão
    session_start();

    // Conecta-se ao banco de dados
    $conexao = mysqli_connect("localhost:3306", "root", "Ci16022005", "eletronico_loja");

    // Executa uma consulta SQL para obter informações do usuário com base no email
    $query = mysqli_query($conexao, "
        SELECT nome, id, adm FROM usuario 
        WHERE '$email' = email
    ");

    // Obtém os dados do usuário como um array associativo
    $usuario = mysqli_fetch_assoc($query);

    // Define variáveis de sessão com informações do usuário
    $_SESSION['email'] = $email;
    $_SESSION['nome'] = $usuario['nome'];
    $_SESSION['id'] = $usuario['id'];
    $_SESSION['adm'] = $usuario['adm'];
?>
