<?php
    // Inicia ou retoma a sessão
    session_start();

    // Verifica se as variáveis de sessão estão definidas
    if(isset($_SESSION['email']) && isset($_SESSION['nome']) && isset($_SESSION['id']) && isset($_SESSION['adm'])) {
        // Cria um array com informações do usuário
        $resposta = array($_SESSION['nome']);
        array_push($resposta, $_SESSION['id']);
        array_push($resposta, $_SESSION['adm']);
        
        // Converte o array para JSON e imprime na saída
        $json = json_encode($resposta);
        echo $json;
    } else {
        // Se as variáveis de sessão não estiverem definidas, imprime um JSON vazio
        echo json_encode('');
    }
?>
