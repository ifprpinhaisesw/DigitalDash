// Função que é executada quando a página é completamente carregada
window.onload = async function carrega_carrinho() {
    // Realiza uma requisição assíncrona (fetch) para obter dados do carrinho do servidor
    var resultado = await fetch("../php/carrinho_retrieve.php", {
        method: "GET"
    });

    // Converte os dados obtidos para um objeto JSON
    var carrinho = await resultado.json();

    // Itera sobre os itens do carrinho para exibir na página
    for (var i = 0; i < carrinho.length; i++) {
        // Cria o conteúdo HTML para exibir as informações de cada item do carrinho
        var conteudo2 = `
        <div class="container">
            <div class="flip">
                <div class="frente">
                    <div class="nome">${carrinho[i].nome}</div>
                    <div class="card-img"><img class="img" src="../img/${carrinho[i].id}.png" alt="" width="100px"></div>
                    <div class="preço">R$${carrinho[i].preco}.00</div>
                    <div class="carrinho-remover" onclick="remover(${carrinho[i].id_compra});window.location.reload();"><i class="fa-solid fa-minus"></i></div>
                </div>
                <div class="tras">
                </div>
            </div>
        </div>
        `;

        // Adiciona o conteúdo ao elemento com id 'card-carrinho'
        document.getElementById('card-carrinho').innerHTML += conteudo2;
    }

    // Obtém dados do usuário a partir do servidor
    var usuario = await fetch("../php/usuario.php", {
        method: "GET"
    });

    // Converte os dados do usuário para um objeto JSON
    var usuario_dados = await usuario.json();

    // Exibe o nome do usuário no elemento com id 'usuario'
    document.getElementById('usuario').innerHTML = `${usuario_dados[0]}`;
}

// Função para remover um item do carrinho
function remover(id) {
    // Cria um objeto FormData para enviar o ID do item a ser removido para o servidor
    var remover_compra = new FormData();
    remover_compra.append("id", id);

    // Realiza uma requisição assíncrona (fetch) para remover o item do carrinho
    fetch("../php/remover.php", {
        method: "POST",
        body: remover_compra
    });
}
