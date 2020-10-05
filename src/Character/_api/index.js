import axios from '@/_utils/axios'

export default {
    async getCharacter(id) {
        return axios.get('/character/'+id, {
            headers: {
                'request_type': 'character'
            }
        })
        .then(response => {
            return response
        })
        .catch(error => {
            console.log("error", error)
        })
    }
}