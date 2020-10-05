import axios from '@/_utils/axios'

export default {
    getLocation(page = undefined) {
        return axios.get('/location'+(page?'?page='+page:''), {
            headers: {
                'request_type': 'location'
            }
        })
        .then((response) => {
            return response
        })
    }
}