<template>
    <v-container class="grey lighten-5">
        <v-row>
            <v-col
                v-for="loc in location"
                :key="loc.id"
                cols="3"
            >
                <v-card
                    class="pa-2"
                    outlined
                    tile
                    style="padding: 20px"
                >
                    {{loc.type}} <br/> {{loc.dimension}} <br/> {{ loc.name }} <br/> Residents {{ loc.residents.length }} <br/>
                    <Residents :residents="loc.residents" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import api from '@/Universe/_api'

    export default {
        data() {
            return {
                location: []
            }
        },
        created() {
            api.getAllLocations()
                .then(response => {
                    this.location = response
                })
        },
        components: {
            Residents: () => import('./Residents')
        }
    }
</script>