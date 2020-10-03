import axios from '@/_utils/axios'

export default {
    async getCharacter(id) {
        return axios.get('/character/'+id)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
}