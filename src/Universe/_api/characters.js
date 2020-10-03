import axios from '@/_utils/axios'

export default {
    async getCharacterbyId(character_id) {
        return axios.get('/character/'+character_id)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    },
    async getCharacter(chr) {
        return axios.get(chr)
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }
}