import axios from './axios'

export default {
    async getLocations() {
        return axios.get('/location')
            .then((response) => {
                return response
            })
    }
}