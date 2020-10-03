import axios from '@/_utils/axios'

export default {
    getLocation(page = undefined) {
        return axios.get('/location'+(page?'?page='+page:''))
            .then((response) => {
                return response
            })
    },

    async getAllLocations() {
        const firstLocation = await this.getLocation(1)
        var allLocations = [...firstLocation.data.results]
        
        for (let i=2; i<=firstLocation.data.info.pages; i++) {
            await this.getLocation(i)
                .then(response => {
                    allLocations = [...allLocations, ...response.data.results]
                })
                .catch(error => {
                    console.log(error)
                })
        }
        return allLocations
    }
}