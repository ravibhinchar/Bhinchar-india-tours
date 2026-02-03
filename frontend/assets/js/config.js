// Config for Backend URL
// Automatically detects if running locally or on production
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// If running locally, use localhost:5001. Otherwise, use Render URL.
window.BACKEND_URL = isLocalhost
    ? 'http://localhost:5001'
    : 'https://bhinchar-india-tours-backend.onrender.com';
