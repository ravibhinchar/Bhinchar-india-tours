document.addEventListener('DOMContentLoaded', async () => {
    // ----------------------------------------
    // 1. Auth & Data Fetching
    // ----------------------------------------
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch('https://bhinchar-india-tours-backend.onrender.com/api/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.ok) {
            const user = await res.json();
            // Update UI elements
            const firstName = user.name.split(' ')[0];

            // Safe update function
            const updateEl = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            };

            updateEl('userName', firstName);
            updateEl('headerName', firstName);
            updateEl('displayName', user.name);
            updateEl('displayEmail', user.email);

        } else {
            console.error('Failed to fetch user data');
            logout();
        }
    } catch (error) {
        console.error('Error:', error);
        // Optional: logout() on network error?
    }

    // ----------------------------------------
    // 2. Logout Logic
    // ----------------------------------------
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }

    const logoutBtnSide = document.getElementById('logoutBtnSide');
    if (logoutBtnSide) logoutBtnSide.addEventListener('click', logout);


    // ----------------------------------------
    // 3. Sidebar Toggle Logic
    // ----------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (mobileToggle && sidebar && sidebarOverlay) {
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        }

        mobileToggle.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }
});
