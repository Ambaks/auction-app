import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ambaks.github.io/auction-app'
});

// Export axios instance
export default api;


