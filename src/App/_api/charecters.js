import axios from './axios'

export default {
    async getCharecter() {
        return axios.get('/character')
            .then((response) => {
                return response
            })
    }
}