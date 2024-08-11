import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bookastay-backend.onrender.com/',
    withCredentials: true, // Include cookies in requests
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
