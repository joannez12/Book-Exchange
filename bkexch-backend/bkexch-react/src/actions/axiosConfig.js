const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001'
})

export default axiosInstance