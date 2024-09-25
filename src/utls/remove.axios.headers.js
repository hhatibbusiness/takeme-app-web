import axios from 'axios';

const token =  () => {
    delete axios.defaults.headers.common['Authorization'];
}

export default token;