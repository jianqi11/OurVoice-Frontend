import axios from 'axios'

const service = axios.create({
    timeout: 5000,
})

service.interceptors.request.use(
    config => {
        const userInfo = localStorage.getItem('userInfo')
        const token = JSON.parse(userInfo)?.token || ''
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        // 在这里你可以处理后端返回的数据
        if (response && response?.data?.code === 401) {
            window.location.href = '/login'
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
