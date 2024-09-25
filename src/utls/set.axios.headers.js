import axios from 'axios';

const token =  token => {
    if(token) {
        // axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi8wMTAxNzg5NzM0MSIsImlhdCI6MTY5MzQxMjgzNywicm9sZSI6IlJPTEVfQWRtaW4iLCJleHAiOjE2OTM0OTkyMzd9.59HS_PRD3qGqXGyj0NnNcPIuJdddeKwht6AQOOcdF6Gk7VCSgv7-ZF0Yjvg9GoSTL2mSce9L_pyX492tQ8K6kw`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default token;