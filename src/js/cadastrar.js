// Função assíncrona para cadastrar um usuário
async function cadastrar(){
    // Obtém os valores dos campos nome, email, senha e confirmar_senha do formulário
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var confirmar_senha = document.getElementById('confirmar-senha').value;

    // Verifica se as senhas são compatíveis
    if (senha != confirmar_senha || senha === null || confirmar_senha === null){
        console.log("Erro na digitação: senhas incompatíveis!");
        alert("Erro na digitação: senhas incompatíveis!");
    } else {
        // Gera um hash SHA-256 da senha usando a biblioteca CryptoJS
        var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);

        // Cria um objeto FormData para enviar os dados para '../php/cadastrar.php'
        var dados = new FormData();
        dados.append('nome', nome);
        dados.append('email', email);
        dados.append('senha', hash);

        // Realiza uma requisição assíncrona (fetch) para cadastrar o usuário
        await fetch('../php/cadastrar.php', {
            method: 'POST',
            body: dados
        });

        // Redireciona para a página de autenticação após o cadastro
        window.location.href = '../html/autenticar.html';
    }
}

// Função assíncrona para autenticar um usuário
async function autenticar(){
    // Obtém os valores dos campos email e senha do formulário
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Realiza uma requisição assíncrona (fetch) para obter dados de autenticação do usuário
    var conteudo = await fetch('../php/autenticar.php', {
        method: 'GET'
    });

    // Gera um hash SHA-256 da senha usando a biblioteca CryptoJS
    var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);

    // Converte os dados obtidos para um objeto JSON
    var dados = await conteudo.json();
    var userFound = false;

    // Itera sobre os dados para verificar a autenticidade do usuário
    for (var i = 0; i < dados.length; i++) {
        if (dados[i].email === email && dados[i].hash === hash) {
            userFound = true;
            console.log("Usuário autenticado!");

            // Cria um objeto FormData para enviar dados de sessão para '../php/session.php'
            var form_dados = new FormData();
            form_dados.append('email', email);
            form_dados.append('senha', hash);

            // Realiza uma requisição assíncrona (fetch) para armazenar dados de sessão
            await fetch('../php/session.php', {
                method: 'POST',
                body: form_dados
            });

            // Redireciona para a página inicial após a autenticação bem-sucedida
            window.location.href = '../html/index.html';
            break;
        }
    }

    // Exibe um alerta se o usuário não for encontrado
    if (!userFound) {
        console.log("ERRO: E-mail ou senha inválidos!");
        alert("ERRO: E-mail ou senha inválidos!");
    }
}
