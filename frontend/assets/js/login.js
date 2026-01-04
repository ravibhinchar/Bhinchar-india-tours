const loginForm = document.querySelector('.login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');
        const submitBtn = loginForm.querySelector('button[type="submit"]');

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;

            const res = await fetch('https://bhinchar-india-tours-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Save token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // Optional: save user info

                // Redirect to home
                alert('Login Successful!');
                window.location.href = 'profile.html';
            } else {
                alert(`Login failed: ${data.message}`);
                submitBtn.textContent = 'Login';
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error('Login Error:', error);
            alert(`Network Error: ${error.message}. Ensure backend is running.`);
            submitBtn.textContent = 'Login';
            submitBtn.disabled = false;
        }
    });
}
