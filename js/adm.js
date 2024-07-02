// Função que é executada quando a página é completamente carregada
window.onload = async function(){
    // Realiza uma requisição assíncrona (fetch) para obter o conteúdo de '../php/retrieve.php'
    var conteudo = await fetch('../php/retrieve.php', {
        method: 'GET'
    });

    // Converte o conteúdo obtido para um objeto JSON
    var produtos = await conteudo.json();
    
    // Itera sobre os produtos obtidos e cria opções para um elemento com id 'produtos'
    for (var i = 0; i < produtos.length; i++){
        var produto = `
        <option value="${produtos[i].nome}">${produtos[i].nome}</option>
        `;
        // Adiciona as opções ao conteúdo do elemento 'produtos'
        document.getElementById('produtos').innerHTML += produto;
    };
}

// Função assíncrona para gravar um novo produto
async function gravar() {
    // Obtém os valores dos campos nome, preço e arquivo do formulário
    var nome = document.getElementById("nome").value;
    var preco = document.getElementById("preco").value;
    var arquivo = document.getElementById("arquivo").files;

    // Cria um objeto FormData para enviar os dados para '../php/gravar.php'
    var dados = new FormData();
    dados.append('nome', nome);
    dados.append('preco', preco);
    dados.append('arquivo', arquivo[0]);

    // Realiza uma requisição assíncrona (fetch) para gravar os dados
    var conteudo = await fetch('../php/gravar.php', {
        method: 'POST',
        body: dados
    });

    // Exibe um alerta informando que o produto foi gravado com sucesso
    alert(`Produto ${nome} gravado com sucesso!`);
}

// Função assíncrona para deletar um produto
async function deletar(){
    // Obtém o valor selecionado do elemento com id 'produtos'
    var selecionado = document.getElementById('produtos').value;

    // Cria um objeto FormData para enviar os dados para '../php/deletar.php'
    var dados = new FormData();
    dados.append('selecionado', selecionado);

    // Realiza uma requisição assíncrona (fetch) para deletar o produto
    var conteudo2 = await fetch('../php/deletar.php', {
        method: 'POST',
        body: dados
    });
}
