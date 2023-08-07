import axios from "axios";
import { ElMessage } from 'element-plus'


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})


service.interceptors.response.use(
    (response) => {
        const { data, message, status } = response.data
        // console.log(response)
        if (status) {
            // console.log(response.data)
            // console.log('msg' + msg)
            return data
        } else {
            ElMessage.error(message)
            return Promise.reject(new Error(message))
        }
    },
    (error) => {
        error.response && ElMessage.error(error.response.data)
        return Promise.reject(new Error(error.response.data))
    }
)

export default service