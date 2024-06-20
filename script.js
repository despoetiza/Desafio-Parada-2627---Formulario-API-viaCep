document.getElementById('cep').addEventListener('blur', async function() {
    const cep = this.value.replace(/\D/g, ''); 
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = await resposta.json();
        if (endereco.erro) {
            alert('CEP inválido. Verifique o CEP digitado.');
        } else {
            document.getElementById('rua').value = endereco.logradouro;
            document.getElementById('bairro').value = endereco.bairro;
            document.getElementById('cidade').value = endereco.localidade;
            document.getElementById('estado').value = endereco.uf;
        }
    } catch (error) {
        alert('Erro ao buscar informações de endereço. Verifique o CEP digitado.');
    }
});


        document.getElementById('criar-cadastro').addEventListener('click', function() {
            const nome = document.getElementById('nome').value.trim();
            const sobrenome = document.getElementById('sobrenome').value.trim();
            const email = document.getElementById('email').value.trim();
            const rua = document.getElementById('rua').value.trim();
            const endereco = `${document.getElementById('rua').value}, ${document.getElementById('bairro').value}, ${document.getElementById('cidade').value}, ${document.getElementById('estado').value}`;

            
            const emailRegex = /^[a-zA-Z0-9._-]{3,25}@[a-zA-Z0-9.-]{3,10}\.[a-zA-Z]{2,3}$/;

            if (!emailRegex.test(email)) {
                alert('E-mail inválido. Verifique o e-mail digitado.');
                return;
            }

            if (nome.length < 3 || sobrenome.length < 3) {
                alert('Nome e sobrenome devem ter pelo menos 3 letras.');
                return;
            }
            if(!rua){
                alert("Preencha corretamente o endereço. Digite um CEP válido.");
                return;

            }

            const nomeCapitalizado = nome.replace(/\b\w/g, (match) => match.toUpperCase());
            const sobrenomeCapitalizado = sobrenome.replace(/\b\w/g, (match) => match.toUpperCase());

            document.getElementById('info-nome').textContent = nomeCapitalizado;
            document.getElementById('info-sobrenome').textContent = sobrenomeCapitalizado;
            document.getElementById('info-email').textContent = email;
            document.getElementById('info-endereco').textContent = endereco;
            document.getElementById('cadastro-form').style.display = 'none';
            document.getElementById('cadastro-info').style.display = 'block';
            alert('Cadastro criado com sucesso!');
        });