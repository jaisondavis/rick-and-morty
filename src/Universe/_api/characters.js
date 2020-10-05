import axios from '@/_utils/axios'

export default {
    async getCharacterbyId(character_id) {
        return axios.get('/character/'+character_id, {
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
    },
    async getCharacter(chr) {
        return axios.get(chr, {
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