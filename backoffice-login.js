function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Add your authentication logic here
    if (username === 'MTA' && password === '123123') {
        // Redirect to the back office screen after successful login
        window.location.href = 'backofiice.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}
