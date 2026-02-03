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
        const res = await fetch(`${window.BACKEND_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.ok) {
            const user = await res.json();
            const firstName = user.name.split(' ')[0];

            const updateEl = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = val;
            };

            updateEl('userName', firstName);
            updateEl('headerName', firstName);
            updateEl('displayName', user.name);
            updateEl('displayEmail', user.email);

            const menu = document.querySelector('.sidebar-menu');
            if (menu && !document.getElementById('adminLink')) {
                const adminLi = document.createElement('li');
                adminLi.className = 'menu-item';
                adminLi.id = 'adminLink';
                adminLi.innerHTML = `
                        <a href="admin.html" class="menu-link" style="color: #007bff; font-weight: 600;">
                            <ion-icon name="shield-checkmark-outline"></ion-icon>
                            <span>Admin Panel</span>
                        </a>
                    `;

                menu.appendChild(adminLi);
            }
        } else {
            console.error('Failed to fetch user data');
            logout();
        }


        const bookingRes = await fetch(`${window.BACKEND_URL}/api/bookings/my-bookings`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (bookingRes.ok) {
            const bookings = await bookingRes.json();
            const listContainer = document.getElementById('bookingsList');
            const countEl = document.getElementById('bookingCount');

            if (countEl) countEl.textContent = bookings.length;

            if (bookings.length === 0) {
                listContainer.innerHTML = '<p style="color: #666;">No bookings found. Time to explore!</p>';
            } else {
                listContainer.innerHTML = bookings.map(b => `
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="color: var(--oxford-blue); font-weight: 600; margin-bottom: 5px;">${b.tourTitle}</h4>
                            <p style="font-size: 0.85rem; color: #666;">${new Date(b.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span style="background: ${b.status === 'Confirmed' ? '#d4edda' : '#fff3cd'}; color: ${b.status === 'Confirmed' ? '#155724' : '#856404'}; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">
                            ${b.status}
                        </span>
                    </div>
                    `).join('');
            }
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
