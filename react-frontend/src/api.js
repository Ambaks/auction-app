import axios from 'axios';

const api = axios.create({
    baseURL: 'https://auction-app-1.onrender.com'
});

// Export axios instance
export default api;


