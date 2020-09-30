<template>
    <p>Rick and Morty</p>
</template>
<script>
    import api from './_api'

    export default {
        data() {
            return {
                location: []
            }
        },
        created() {
            api.getLocations()
                .then(response => {
                    this.location = response.data.results
                })
        }
    }
</script>