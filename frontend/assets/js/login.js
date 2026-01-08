import { auth, googleProvider, signInWithPopup } from './firebase-config.js';

const loginForm = document.querySelector('.login-form');
const googleLoginBtn = document.getElementById('googleLoginBtn');

// Helper: Handle Login Response
const handleLoginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    // Store user info (including role)
    const user = { name: data.name, email: data.email, role: data.role };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Login Successful!');

    // Redirect based on Role
    if (data.role === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'profile.html';
    }
};

// 1. Standard Email/Password Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        const submitBtn = loginForm.querySelector('button[type="submit"]');

        try {
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;

            const res = await fetch(`${window.BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                handleLoginSuccess(data);
            } else {
                alert(`Login failed: ${data.message}`);
                submitBtn.textContent = 'Login';
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert(`Network Error: ${error.message}`);
            submitBtn.textContent = 'Login';
            submitBtn.disabled = false;
        }
    });
}

// 2. Google Login
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Send Google User Info to Backend
            const res = await fetch(`${window.BACKEND_URL}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    googleId: user.uid
                })
            });

            const data = await res.json();

            if (res.ok) {
                handleLoginSuccess(data);
            } else {
                alert(`Google Login failed: ${data.message}`);
            }

        } catch (error) {
            console.error('Google Auth Error:', error);
            alert(`Google Sign-In Error: ${error.message}`);
        }
    });
}
