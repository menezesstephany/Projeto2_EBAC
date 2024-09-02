document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contato');
    const tabela = document.querySelector('table');
    const contatos = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const nomeCompleto = document.getElementById('nome-completo').value.trim();
        const ddd = document.getElementById('numeroddd').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!validarCampos(nomeCompleto, ddd, telefone, email)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        if (verificarContato(nomeCompleto, telefone, email)) {
            alert('Esse contato já foi cadastrado.');
            return;
        }

        adicionarContatoTabela(nomeCompleto, ddd, telefone, email);

        form.reset();
    });

    function validarCampos(nome, ddd, telefone, email) {
        const nomeCompleto = nome.split(' ');
        if (nomeCompleto.length < 2 || !ddd || telefone.length < 8 || !validarEmail(email)) {
            return false;
        }
        return true;
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function verificarContato(nome, telefone, email) {
        return contatos.some(contato => contato.nome === nome || contato.telefone === telefone || contato.email === email);
    }

    function adicionarContatoTabela(nome, ddd, telefone, email) {
        contatos.push({ nome, ddd, telefone, email });

        const novaLinha = document.createElement('tr');

        const nomeCell = document.createElement('td');
        nomeCell.textContent = nome;
        novaLinha.appendChild(nomeCell);

        const telefoneCell = document.createElement('td');
        telefoneCell.textContent = `(${ddd}) ${telefone}`;
        novaLinha.appendChild(telefoneCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = email;
        novaLinha.appendChild(emailCell);

        tabela.querySelector('tbody').appendChild(novaLinha);
    }
});
