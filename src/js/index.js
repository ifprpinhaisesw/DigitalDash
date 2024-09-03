// Função executada quando a página é completamente carregada
window.onload = async function carrega() {
    // Obtém dados do usuário do servidor
    var usuario = await fetch("../php/usuario.php", {
        method: "GET"
    });

    // Converte os dados do usuário para um objeto JSON
    var usuario_dados = await usuario.json();

    // Verifica se há dados do usuário e se há pelo menos um registro
    if (usuario_dados && usuario_dados.length > 0) {
        // Exibe o nome do usuário no elemento com id 'usuario'
        document.getElementById('usuario').innerHTML = `${usuario_dados[0]}`;

        // Verifica se o usuário é um administrador (admin)
        if (usuario_dados[2] == 1) {
            // Se for admin, exibe 'ADMIN' como nome de usuário
            document.getElementById('usuario').innerHTML = `ADMIN`;
            
            // Adiciona um ícone de engrenagem com um link para a página de administração
            document.getElementById('admin-page').innerHTML = `
                <i onclick="window.location.href = 'adm.html'" class="fa-solid fa-gear"></i>
            `;
        };
    } else {
        // Se não houver dados do usuário, remove o botão 'Sair'
        var sair = document.getElementById('sair');
        sair.remove();
    };

    // Obtém dados dos produtos do servidor
    var resultado = await fetch("../php/retrieve.php", {
        method: "GET"
    });

    // Converte os dados dos produtos para um objeto JSON
    var dados = await resultado.json();

    // Itera sobre os produtos para exibir na página
    for (var i = 0; i < dados.length; i++) {
        // Cria o conteúdo HTML para exibir as informações de cada produto
        var conteudo = `
        <div class="container">
            <div class="flip">
                <div class="frente">
                    <div class="nome">${dados[i].nome}</div>
                    <div class="card-img"><img class="img" src="../img/${dados[i].id}.png" alt="" width="100px"></div>
                    <div class="preço">R$${dados[i].preco}.00</div>
                    <div class="carrinho" onclick="carrinho(${dados[i].id}, ${usuario_dados[1]})"><i class="fa-solid fa-shopping-cart"></i></div>
                </div>
                <div class="tras">
                </div>
            </div>
        </div>
        `;
        
        // Adiciona o conteúdo ao elemento com id 'frenteLoja'
        document.getElementById('frenteLoja').innerHTML += conteudo;
    };

    // Adiciona um ouvinte de eventos para a caixa de pesquisa
    var pesquisa = document.getElementById('pesquisa');
    pesquisa.addEventListener('input', function() {
        // Obtém o termo de pesquisa em minúsculas
        var termo = pesquisa.value.toLowerCase();

        // Filtra os produtos com base no termo de pesquisa
        var filtro = dados.filter(function(produto) {
            return produto.nome.toLowerCase().includes(termo);
        });

        // Limpa o conteúdo atual do elemento com id 'frenteLoja'
        document.getElementById('frenteLoja').innerHTML = '';

        // Itera sobre os produtos filtrados para exibir na página
        for (var i = 0; i < filtro.length; i++) {
            var conteudo = `
                <div class="container">
                    <div class="flip">
                        <div class="frente">
                            <div class="nome">${filtro[i].nome}</div>
                            <div class="card-img"><img class="img" src="../img/${filtro[i].id}.png" alt="" width="100px"></div>
                            <div class="preço">R$${filtro[i].preco}.00</div>
                            <div class="carrinho" onclick="carrinho(${filtro[i].id}, ${usuario_dados[1]})"><i class="fa-solid fa-shopping-cart"></i></div>
                        </div>
                        <div class="tras">
                        </div>
                    </div>
                </div>
            `;
            
            // Adiciona o conteúdo ao elemento com id 'frenteLoja'
            document.getElementById('frenteLoja').innerHTML += conteudo;
        }
    });
}

// Função para adicionar um produto ao carrinho
function carrinho(id_produto, id_usuario) {
    // Cria um objeto FormData para enviar os IDs do produto e usuário para o servidor
    var compras = new FormData();
    compras.append("id_produto", id_produto);
    compras.append("id_usuario", id_usuario);

    // Realiza uma requisição assíncrona (fetch) para adicionar o produto ao carrinho
    fetch("../php/carrinho.php", {
        method: "POST",
        body: compras
    });
}

// Função assíncrona para sair (encerrar a sessão do usuário)
async function sair() {
    // Realiza uma requisição assíncrona (fetch) para encerrar a sessão do usuário no servidor
    await fetch("../php/sair.php", {
        method: 'GET'
    });
}
