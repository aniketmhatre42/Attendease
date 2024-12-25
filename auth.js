document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Simulate authentication (replace with real authentication logic)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('role', 'admin');
            localStorage.setItem('username', username);
            window.location.href = 'admin.html';
        } else if (username === 'student' && password === 'student123') {
            localStorage.setItem('role', 'student');
            localStorage.setItem('username', username);
            window.location.href = 'student.html';
        } else {
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
});