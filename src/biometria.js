const apiUrl = 'http://localhost:3000/api/biometrias';

const biometriaForm = document.getElementById('biometriaForm');
const biometriaList = document.getElementById('biometriaList');

async function registrarBiometria(event) {
    event.preventDefault();

    const colaborador = document.getElementById('colaborador').value;
    const biometria = document.getElementById('biometria').files[0];

    const formData = new FormData();
    formData.append('colaborador', colaborador);
    formData.append('biometria', biometria);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Biometria registrada com sucesso!');
            carregarBiometrias();
            biometriaForm.reset();
        } else {
            alert('Erro ao registrar biometria.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao se comunicar com o servidor.');
    }
}

async function carregarBiometrias() {
    try {
        const response = await fetch(apiUrl);
        const biometrias = await response.json();

        biometriaList.innerHTML = '';

        biometrias.forEach(biometria => {
            const li = document.createElement('li');
            li.textContent = `Colaborador: ${biometria.colaborador} - Biometria ID: ${biometria.id}`;
            biometriaList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar biometrias:', error);
    }
}

carregarBiometrias();

biometriaForm.addEventListener('submit', registrarBiometria);
