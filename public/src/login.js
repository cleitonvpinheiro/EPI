document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Verifica se os campos estão preenchidos
    if (!username || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        // Faz a solicitação para a API de login
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Exibe a mensagem de sucesso
            alert(data.message || 'Login realizado com sucesso!');
            // Armazena o token no localStorage
            localStorage.setItem('token', data.token);
            // Redireciona para o painel de controle
            window.location.href = '/dashboard.html';
        } else {
            // Exibe a mensagem de erro do servidor
            alert(data.message || 'Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.');
    }
});
