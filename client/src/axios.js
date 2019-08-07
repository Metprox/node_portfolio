import axios from 'axios';

const PORT = process.env.PORT || 5000;

// Set config defaults when creating the instance
const Axios = axios.create({
    // baseURL: `https://fierce-lowlands-68726.herokuapp.com:${PORT}`,
    baseURL: `http://localhost:5000`,
});

export default Axios;
