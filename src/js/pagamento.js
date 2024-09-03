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
        // Define a variável 'usuarioAutenticado' como true
        usuarioAutenticado = true;

        // Exibe o nome do usuário no elemento com id 'usuario'
        document.getElementById('usuario').innerHTML = `${usuario_dados[0]}`;

        // Verifica se o usuário é um administrador (admin)
        if (usuario_dados[2] == 1) {
            // Se for admin, exibe 'ADMIN' como nome de usuário
            document.getElementById('usuario').innerHTML = `ADMIN`;
        };

        // Chama a função 'revisar' para carregar e exibir o carrinho de compras
        revisar();
    } else {
        // Se não houver dados do usuário, remove o botão 'Sair'
        var sair = document.getElementById('sair');
        sair.remove();
    };
}

// Função assíncrona para revisar o carrinho de compras
async function revisar() {
    // Obtém os itens do carrinho do servidor
    var resultado = await fetch("../php/carrinho_retrieve.php", {
        method: "GET"
    });

    // Converte os dados do carrinho para um objeto JSON
    var carrinho = await resultado.json();

    // Inicializa a variável 'soma' para calcular o total da compra
    var soma = 0;

    // Limpa o conteúdo atual do elemento com id 'carregar'
    document.getElementById('carregar').innerHTML = '';
    
    // Configura a cor de fundo do elemento 'revisar-pagamento'
    document.getElementById('revisar-pagamento').style.backgroundColor = '#04AA6D';

    // Cria elementos HTML dinamicamente para exibir os itens do carrinho
    var cardCarrinhoDiv = document.createElement('div');
    cardCarrinhoDiv.id = 'card-carrinho';

    // Cria um elemento para exibir o total da compra
    var totalCompraDiv = document.createElement('div');
    totalCompraDiv.id = 'total-compra';

    // Constrói o HTML para os itens do carrinho
    var conteudo2 = ``;
    for (var i = 0; i < carrinho.length; i++) {
        conteudo2 +=
            `
        <div class="produto">
            <div class="card-nome">${carrinho[i].nome}</div>
            <div class="card-imagem"><img class="img" src="../img/${carrinho[i].id}.png" alt="" width="100px"></div>
            <div class="card-preco">R$${carrinho[i].preco}.00</div>
        </div>
        `;
        // Calcula o total da compra somando os preços dos itens
        soma = soma + parseInt(carrinho[i].preco);
    }

    // Adiciona o conteúdo ao elemento 'cardCarrinhoDiv'
    cardCarrinhoDiv.innerHTML = conteudo2;

    // Configura o texto para exibir o total da compra
    totalCompraDiv.innerHTML = 'Valor total da compra: R$' + soma + '.00';

    // Obtém o elemento 'carregar'
    var carregarDiv = document.getElementById('carregar');

    // Adiciona os elementos 'totalCompraDiv' e 'cardCarrinhoDiv' ao elemento 'carregarDiv'
    carregarDiv.append(totalCompraDiv);
    carregarDiv.append(cardCarrinhoDiv);

    // Adiciona o botão 'Próximo' com a função 'tipo' como evento de clique
    document.getElementById('carregar').innerHTML += `<div id="proximo-revisar" class="proximo" onclick="tipo()">Próximo</div>`;
}

// Função assíncrona para escolher o tipo de pagamento
async function tipo() {
    // Constrói o HTML para a escolha do tipo de pagamento
    var conteudo2 =
        `
    <div class="form-pagamento">
        <h1>Selecione uma forma de pagamento:</h1>

        <div class="opcao-pagamento">
            <input type="radio" id="cartao-credito" name="pagamento" value="credito">
            Cartão de crédito
            <label for="cartao-credito">
                <img src="../img/cartao_credito.png" width="30px">
            </label>
        </div>

        <div class="opcao-pagamento">
            <input type="radio" id="cartao-debito" name="pagamento" value="debito">
            Cartão de débito
            <label for="cartao-debito">
                <img src="../img/cartao_debito.png" width="30px">
            </label>
        </div>

        <div class="opcao-pagamento">
            <input type="radio" id="pix" name="pagamento" value="pix">
            PIX
            <label for="pix">
                <img src="../img/pix.png" width="60px">
            </label>
        </div>

        <div id="proximo-tipo" class="proximo">Próximo</div>
    </div>
    `;

    // Limpa o conteúdo atual do elemento 'carregar'
    document.getElementById('carregar').innerHTML = '';

    // Adiciona o HTML ao elemento 'carregar'
    document.getElementById('carregar').innerHTML = conteudo2;

    // Configura a cor de fundo dos elementos relevantes
    document.getElementById('revisar-pagamento').style.backgroundColor = '#231f20';
    document.getElementById('tipo-pagamento').style.backgroundColor = '#04AA6D';

    // Adiciona um ouvinte de eventos para o botão 'Próximo' com a função 'tipo' como evento de clique
    document.querySelector('.proximo').addEventListener('click',
        function() {
            // Obtém o tipo de pagamento escolhido
            var metodo = document.querySelector('input[name="pagamento"]:checked').value;
            // Chama a função 'detalhes' passando o tipo de pagamento como parâmetro
            detalhes(metodo);
        });
}

// Função assíncrona para fornecer detalhes com base no tipo de pagamento escolhido
async function detalhes(tipo) {
    // Constrói o HTML para fornecer detalhes com base no tipo de pagamento escolhido
    var conteudo2 = ``;

    if (tipo == 'debito') {
        conteudo2 =
            `
        <div class="form-detalhes">
            <h1>Detalhes do Pagamento com Cartão de Débito</h1>
            <label for="numero-cartao">Número do Cartão:</label>
            <input type="number" id="numero-cartao" name="numero-cartao" placeholder="**** **** **** ****" maxlength="16" required><br>

            <label for="validade-cartao">Validade:</label>
            <input type="date" id="validade-cartao" name="validade-cartao" required><br>

            <label for="cvv-cartao">CVV:</label>
            <input type="number" maxlength="3" id="cvv-cartao" name="cvv-cartao" placeholder="***" required><br>

            <div id="proximo-detalhes" onclick="finalizar('${tipo}')">Finalizar Pagamento</div>
        </div>
    `;
    } else if (tipo == 'credito') {
        conteudo2 =
            `
        <div class="form-detalhes">
            <h1>Detalhes do Pagamento com Cartão de Crédito</h1>
            <label for="numero-cartao">Número do Cartão:</label>
            <input type="number" id="numero-cartao" name="numero-cartao" placeholder="**** **** **** ****" maxlength="16" required><br>

            <label for="validade-cartao">Validade:</label>
            <input type="date" id="validade-cartao" name="validade-cartao" required><br>

            <label for="cvv-cartao">CVV:</label>
            <input type="number" maxlength="3" id="cvv-cartao" name="cvv-cartao" placeholder="***" required><br>

            <div id="proximo-detalhes" onclick="finalizar('${tipo}')">Finalizar Pagamento</div>
        </div>
    `;
    } else if (tipo == 'pix') {
        conteudo2 =
            `
        <div class="form-detalhes">
            <h1>Detalhes do Pagamento com PIX</h1>
            <div class="form-img">
                <img id="form-img" src='../img/qrcode.png' width="100px"><br>
            </div>
            <div id="proximo-detalhes" onclick="finalizar('${tipo}')">Finalizar Pagamento</div>
        </div>
    `;
    }

    // Limpa o conteúdo atual do elemento 'carregar'
    document.getElementById('carregar').innerHTML = '';

    // Adiciona o HTML ao elemento 'carregar'
    document.getElementById('carregar').innerHTML = conteudo2;

    // Configura a cor de fundo dos elementos relevantes
    document.getElementById('tipo-pagamento').style.backgroundColor = '#231f20';
    document.getElementById('detalhes-pagamento').style.backgroundColor = '#04AA6D';
}

// Função assíncrona para finalizar a compra com base no tipo de pagamento escolhido
async function finalizar(tipo) {
    // Obtém os itens do carrinho do servidor
    var resultado = await fetch("../php/carrinho_retrieve.php", {
        method: "GET"
    });

    // Converte os dados do carrinho para um objeto JSON
    var carrinho = await resultado.json();

    // Obtém a quantidade de itens no carrinho
    var compra = carrinho.length;

    // Cria um objeto FormData para enviar dados do carrinho para o servidor
    dados = new FormData();
    dados.append('compras', compra);

    // Envia os dados do carrinho para o servidor usando uma requisição POST
    await fetch('../php/compras.php', {
        method: 'POST',
        body: dados
    });

    // Atualiza o conteúdo da página para exibir uma mensagem de sucesso
    var conteudo2 =
    `
    <div class="finalizar-tudo">
        <img src="../img/sucesso.png" width: 500px>
        <div class="finalizar" onclick="window.location.href = '../html/index.html' ">Ok, entendi</div>
    </div>
    `;

    // Limpa o conteúdo atual do elemento com id 'carregar' e exibe a mensagem de sucesso
    document.getElementById('carregar').innerHTML = '';
    document.getElementById('carregar').innerHTML = conteudo2;

    // Atualiza as cores dos elementos para refletir a etapa concluída
    document.getElementById('detalhes-pagamento').style.backgroundColor = '#231f20';
    document.getElementById('finalizar-compra').style.backgroundColor = '#04AA6D';
}
