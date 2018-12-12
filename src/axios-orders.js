import axios from 'axios';

const instance = axios.create({
baseURL: 'https://bbaproject-40c21.firebaseio.com/'
})

export default instance;
