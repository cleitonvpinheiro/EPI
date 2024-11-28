document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Enviar os dados de login para o servidor
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message); // Mensagem de sucesso
        localStorage.setItem('token', data.token); // Armazenar o token no localStorage
        window.location.href = '/dashboard.html'; // Redirecionar para o painel de controle
    } else {
        alert(data.message); // Mensagem de erro
    }
});
