const apiUrl = 'http://localhost:3000/api/uniformes';

const uniformForm = document.getElementById('uniformForm');
const uniformList = document.getElementById('uniformList');

async function registrarUniforme(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const tamanho = document.getElementById('tamanho').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataEntrega = document.getElementById('dataEntrega').value;

    const novoUniforme = {
        nome,
        tipo,
        tamanho,
        quantidade,
        dataEntrega,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoUniforme),
        });

        if (response.ok) {
            alert('Uniforme registrado com sucesso!');
            carregarUniformes();
            uniformForm.reset();
        } else {
            alert('Erro ao registrar uniforme.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao se comunicar com o servidor.');
    }
}

async function carregarUniformes() {
    try {
        const response = await fetch(apiUrl);
        const uniformes = await response.json();

        uniformList.innerHTML = '';

        uniformes.forEach(uniforme => {
            const li = document.createElement('li');
            li.textContent = `Colaborador: ${uniforme.nome} - Tipo: ${uniforme.tipo} - Tamanho: ${uniforme.tamanho} - Quantidade: ${uniforme.quantidade} - Data de Entrega: ${uniforme.dataEntrega}`;
            uniformList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar uniformes:', error);
    }
}

carregarUniformes();

uniformForm.addEventListener('submit', registrarUniforme);
