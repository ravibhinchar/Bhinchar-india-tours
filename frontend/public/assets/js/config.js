// Config for Backend URL
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

window.BACKEND_URL = isLocalhost
    ? 'http://localhost:5001'
    : 'https://bhinchar-india-tours-backend.onrender.com';
