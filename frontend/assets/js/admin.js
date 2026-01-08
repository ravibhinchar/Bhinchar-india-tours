document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const fetchBookings = async () => {
        try {
            const res = await fetch(`${window.BACKEND_URL}/api/bookings/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.status === 401 || res.status === 403) {
                alert('Access Denied. You are not an Admin.');
                window.location.href = 'profile.html';
                return;
            }

            const bookings = await res.json();
            const tbody = document.getElementById('adminBookingList');
            tbody.innerHTML = '';

            if (bookings.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No bookings found yet.</td></tr>';
                return;
            }

            bookings.forEach(b => {
                const row = `
                    <tr>
                        <td>${b.user ? b.user.name : 'Unknown'}</td>
                        <td>${b.user ? b.user.email : 'Unknown'}</td>
                        <td>${b.tourTitle}</td>
                        <td><small>${b.tourId}</small></td>
                        <td>${new Date(b.createdAt).toLocaleDateString()}</td>
                        <td><span class="status-badge ${b.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'}">${b.status}</span></td>
                        <td>
                            ${b.status === 'Pending' ? `
                                <button onclick="updateStatus('${b._id}', 'Confirmed')" class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.8rem; background: green; color: white;">Approve</button>
                                <button onclick="updateStatus('${b._id}', 'Rejected')" class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.8rem; background: red; color: white;">Reject</button>
                            ` : '-'}
                        </td>
                    </tr>
                `;
                tbody.insertAdjacentHTML('beforeend', row);
            });

        } catch (error) {
            console.error('Admin Error:', error);
            alert('Failed to load admin data. Ensure backend is running locally.');
        }
    };

    // Expose function to window for onclick access
    window.updateStatus = async (id, status) => {
        if (!confirm(`Are you sure you want to ${status} this booking?`)) return;

        try {
            const res = await fetch(`${window.BACKEND_URL}/api/bookings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                alert(`Booking ${status}!`);
                fetchBookings(); // Refresh list
            } else {
                alert('Failed to update status.');
            }
        } catch (error) {
            console.error('Update Error:', error);
            alert('Error updating status.');
        }
    };

    const fetchInquiries = async () => {
        try {
            const res = await fetch(`${window.BACKEND_URL}/api/inquiries`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const inquiries = await res.json();
            const tbody = document.getElementById('adminInquiryList');
            if (tbody) tbody.innerHTML = '';

            if (!inquiries || inquiries.length === 0) {
                if (tbody) tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No inquiries found.</td></tr>';
                return;
            }

            inquiries.forEach(iq => {
                const row = `
                    <tr>
                        <td>${iq.destination}</td>
                        <td>${iq.people}</td>
                        <td>${new Date(iq.checkin).toLocaleDateString()}</td>
                        <td>${new Date(iq.checkout).toLocaleDateString()}</td>
                        <td>${new Date(iq.createdAt).toLocaleDateString()}</td>
                    </tr>
                `;
                if (tbody) tbody.insertAdjacentHTML('beforeend', row);
            });

        } catch (error) {
            console.error('Inquiry Fetch Error:', error);
        }
    };

    fetchBookings();
    fetchInquiries();
});
