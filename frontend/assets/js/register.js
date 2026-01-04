const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const submitBtn = registerForm.querySelector('button[type="submit"]');

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            const res = await fetch('https://bhinchar-india-tours-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Save token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                alert('Account Created Successfully!');
                window.location.href = 'profile.html';
            } else {
                alert(`Registration failed: ${data.message}`);
                submitBtn.textContent = 'Sign Up';
                submitBtn.disabled = false;
            }

        } catch (error) {
            console.error('Registration Error:', error);
            alert(`Network Error: ${error.message}. Ensure backend is running.`);
            submitBtn.textContent = 'Sign Up';
            submitBtn.disabled = false;
        }
    });
}
