import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/me/index.php'
});